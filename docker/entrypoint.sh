#!/bin/bash
set -e

# If .env file doesn’t exist, create it from environment
if [ ! -f /var/www/html/.env ]; then
  echo "Creating .env file from environment variables..."
  envsubst < /var/www/html/.env.example > /var/www/html/.env
fi

# Only generate key if not already set
if [ -z "$APP_KEY" ]; then
  php artisan key:generate --ansi
fi

php artisan migrate --force --ansi
php artisan optimize:clear --ansi

exec "$@"
