call composer install
pause
php bin/console doctrine:database:create
pause
php bin/console make:migration
pause
php bin/console doctrine:migrations:migrate
pause

