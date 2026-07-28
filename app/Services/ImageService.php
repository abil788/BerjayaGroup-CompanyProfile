<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * Optimize an uploaded image, convert it to WebP format, and save it to the active storage disk.
     *
     * @param UploadedFile $file The uploaded file.
     * @param string $directory The target directory under the disk (e.g. 'services', 'projects').
     * @param int $maxWidth The maximum width of the image.
     * @param int $quality Compression quality (0-100).
     * @return string|null The public URL to the optimized image.
     */
    public static function optimizeAndSave(UploadedFile $file, string $directory, int $maxWidth = 1600, int $quality = 80): ?string
    {
        // Get dynamic disk name from environment config (defaults to 'public' for local)
        $diskName = env('FILESYSTEM_DISK', 'public');
        $disk = Storage::disk($diskName);

        // Generate unique filename with .webp extension
        $filename = uniqid('img_', true) . '.webp';
        
        // Define temporary path for local GD processing
        $tempDir = sys_get_temp_dir();
        $tempPath = tempnam($tempDir, 'img_opt_');

        try {
            $imageInfo = @getimagesize($file->getRealPath());
            if (!$imageInfo) {
                // If not readable by getimagesize, store raw file on active disk as fallback
                $path = $file->store($directory, $diskName);
                return $disk->url($path);
            }

            $mime = $imageInfo['mime'];
            $width = $imageInfo[0];
            $height = $imageInfo[1];

            // Create image resource based on mimetype
            switch ($mime) {
                case 'image/jpeg':
                case 'image/jpg':
                    $image = @imagecreatefromjpeg($file->getRealPath());
                    break;
                case 'image/png':
                    $image = @imagecreatefrompng($file->getRealPath());
                    if ($image) {
                        imagealphablending($image, false);
                        imagesavealpha($image, true);
                    }
                    break;
                case 'image/gif':
                    $image = @imagecreatefromgif($file->getRealPath());
                    break;
                case 'image/webp':
                    $image = @imagecreatefromwebp($file->getRealPath());
                    break;
                default:
                    // Unsupported GD format, fallback to default store on active disk
                    $path = $file->store($directory, $diskName);
                    return $disk->url($path);
            }

            if (!$image) {
                // Failed to create image resource, fallback
                $path = $file->store($directory, $diskName);
                return $disk->url($path);
            }

            // Downscale image if width exceeds maxWidth to save bandwidth/disk
            if ($width > $maxWidth) {
                $newWidth = $maxWidth;
                $newHeight = (int) (($height / $width) * $newWidth);

                $resizedImage = imagecreatetruecolor($newWidth, $newHeight);
                if ($resizedImage) {
                    imagealphablending($resizedImage, false);
                    imagesavealpha($resizedImage, true);
                    imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
                    imagedestroy($image);
                    $image = $resizedImage;
                }
            }

            // Save optimized WEBP image to temporary file
            $saved = @imagewebp($image, $tempPath, $quality);
            @imagedestroy($image);

            if (!$saved || !file_exists($tempPath)) {
                $path = $file->store($directory, $diskName);
                return $disk->url($path);
            }

            // Put temporary file contents into Laravel storage disk
            $finalPath = $directory . '/' . $filename;
            $disk->put($finalPath, fopen($tempPath, 'r'));

            // Clean up temporary file
            @unlink($tempPath);

            // Return full public URL (works dynamically for both local public storage and cloud S3)
            return $disk->url($finalPath);
        } catch (\Throwable $e) {
            // Clean up on error
            if (file_exists($tempPath)) {
                @unlink($tempPath);
            }
            // Safe fallback: store the file as uploaded by user on active disk
            $path = $file->store($directory, $diskName);
            return $disk->url($path);
        }
    }

    /**
     * Delete an image from the active storage disk by its public URL.
     *
     * @param string|null $url The public URL of the image.
     * @return void
     */
    public static function deleteByUrl(?string $url): void
    {
        if (!$url) {
            return;
        }

        $diskName = env('FILESYSTEM_DISK', 'public');
        $disk = Storage::disk($diskName);

        $path = null;

        // Parse path out of URL depending on disk type
        if ($diskName === 'public') {
            // Local URL path contains '/storage/'. Local path starts after it.
            // Example URL: http://localhost:8000/storage/services/img_xxx.webp or /storage/services/img_xxx.webp
            if (str_contains($url, '/storage/')) {
                $path = substr($url, strpos($url, '/storage/') + 9);
            }
        } else {
            // S3 URL path: https://bucket.s3.region.amazonaws.com/services/img_xxx.webp
            $parsed = parse_url($url);
            if (isset($parsed['path'])) {
                $path = ltrim($parsed['path'], '/');
                
                // If using S3 bucket path style, it might include the bucket name as prefix
                $bucket = env('AWS_BUCKET');
                if ($bucket && str_starts_with($path, $bucket . '/')) {
                    $path = substr($path, strlen($bucket) + 1);
                }
            }
        }

        if ($path) {
            $disk->delete($path);
        }
    }
}
