<?php
$src = __DIR__ . '/../public/test.jpg';
$dst = __DIR__ . '/../public/test.webp';
if (file_exists($src)) {
    $img = imagecreatefromjpeg($src);
    imagewebp($img, $dst, 80);
    imagedestroy($img);
    echo "test.jpg (" . round(filesize($src)/1024) . " KB) -> test.webp (" . round(filesize($dst)/1024) . " KB)\n";
}
