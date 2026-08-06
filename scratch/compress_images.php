<?php

function processImage($srcPath, $dstPath, $maxWidth, $maxHeight, $quality = 80) {
    if (!file_exists($srcPath)) {
        echo "File not found: {$srcPath}\n";
        return;
    }

    list($origW, $origH, $type) = getimagesize($srcPath);
    if ($type === IMAGETYPE_PNG) {
        $img = imagecreatefrompng($srcPath);
    } elseif ($type === IMAGETYPE_JPEG) {
        $img = imagecreatefromjpeg($srcPath);
    } else {
        echo "Unsupported type for {$srcPath}\n";
        return;
    }

    $scale = min($maxWidth / $origW, $maxHeight / $origH, 1.0);
    $newW = (int)round($origW * $scale);
    $newH = (int)round($origH * $scale);

    $dst = imagecreatetruecolor($newW, $newH);
    imagealphablending($dst, false);
    imagesavealpha($dst, true);
    $transparent = imagecolorallocatealpha($dst, 255, 255, 255, 127);
    imagefilledrectangle($dst, 0, 0, $newW, $newH, $transparent);

    imagecopyresampled($dst, $img, 0, 0, 0, 0, $newW, $newH, $origW, $origH);

    imagewebp($dst, $dstPath, $quality);
    imagedestroy($img);
    imagedestroy($dst);

    $oldSize = filesize($srcPath);
    $newSize = filesize($dstPath);
    echo sprintf(
        "%-25s %4dx%-4d (%4d KB) -> %-25s %4dx%-4d (%4d KB)\n",
        basename($srcPath), $origW, $origH, round($oldSize/1024),
        basename($dstPath), $newW, $newH, round($newSize/1024)
    );
}

$baseDir = __DIR__ . '/../public';

echo "=== Processing Static Logos ===\n";
processImage("{$baseDir}/logo.png", "{$baseDir}/logo.webp", 200, 150, 85);
processImage("{$baseDir}/berjayafooter.png", "{$baseDir}/berjayafooter.webp", 300, 200, 85);

echo "\n=== Processing Client Logos ===\n";
$clientDir = "{$baseDir}/clients";
$files = glob("{$clientDir}/*.png");
foreach ($files as $file) {
    $pathInfo = pathinfo($file);
    $dstWebp = "{$pathInfo['dirname']}/{$pathInfo['filename']}.webp";
    processImage($file, $dstWebp, 300, 300, 85);
}

echo "\nProcessing Complete!\n";
