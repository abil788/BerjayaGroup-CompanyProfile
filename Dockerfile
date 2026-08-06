# ---- Stage 1: Build frontend assets (Vite) ----
FROM node:20-alpine AS frontend
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---- Stage 2: PHP + Laravel ----
FROM php:8.3-fpm-alpine AS backend

RUN apk add --no-cache \
    nginx supervisor sqlite sqlite-dev libzip-dev libpng-dev oniguruma-dev \
    && docker-php-ext-install pdo pdo_sqlite mbstring zip gd bcmath

WORKDIR /var/www/html

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY composer*.json ./
RUN composer install --no-dev --optimize-autoloader --no-scripts

# App code + hasil build Vite dari stage sebelumnya
COPY . .
COPY --from=frontend /app/public/build ./public/build

RUN mkdir -p database && touch database/database.sqlite \
    && mkdir -p storage/framework/{cache,sessions,views} storage/logs bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache database \
    && php artisan storage:link

# Nginx config sederhana
COPY docker/nginx.conf /etc/nginx/http.d/default.conf
COPY docker/start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080
CMD ["/start.sh"]