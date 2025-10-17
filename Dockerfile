# 1. Build Stage
FROM composer:2 AS build
WORKDIR /app

ENV APP_NAME=SIPIJAR
ENV APP_URL=https://admin.sipijar.my.id
ENV VITE_APP_NAME=SIPIJAR
ENV VITE_APP_URL=https://admin.sipijar.my.id

# Dependencies
RUN apk add --no-cache nodejs npm \
    && npm install -g pnpm

# Backend Build
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-interaction --prefer-dist --optimize-autoloader

# Frontend Build
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

# 2. Runtime Stage
FROM php:8.3-fpm-alpine AS runtime

# Install system dependencies and PHP extensions
RUN apk add --no-cache \
    nginx \
    bash \
    supervisor \
    icu-dev \
    libpng-dev \
    libjpeg-turbo-dev \
    libwebp-dev \
    libzip-dev \
    libpq-dev \
    zip \
    unzip \
    oniguruma-dev \
    gettext
RUN docker-php-ext-install pdo pdo_mysql pdo_pgsql pgsql mbstring exif pcntl bcmath gd intl zip opcache

# Configure PHP-FPM and Nginx
COPY ./docker/php.ini /usr/local/etc/php/conf.d/php.ini
COPY ./docker/nginx.conf /etc/nginx/nginx.conf

# Set up application
WORKDIR /var/www/html
COPY --from=build /app ./

# Set permissions
RUN chown -R www-data:www-data /var/www/html && chmod -R 755 /var/www/html/storage

# Entrypoint script
COPY ./docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh && \
    chmod +x /usr/local/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

# Start services
COPY ./docker/supervisord.conf /etc/supervisord.conf
EXPOSE 80
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
