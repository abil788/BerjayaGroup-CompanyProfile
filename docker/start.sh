#!/bin/sh
set -e

php artisan config:clear
php artisan migrate --force --seed
php artisan config:cache
php artisan route:cache

php-fpm -D
nginx -g "daemon off;"