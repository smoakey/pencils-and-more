# Pencils and More

A simple crud app for managing a pencil inventory


## Requirements

- PHP > 5.5.9
- MySQL
- Composer (https://getcomposer.org/)


## Installing the API

- Clone Repo -> 
	```git clone https://github.com/smoakey/pencils-and-more.git pencils-and-more```
- Go to api folder -> 
	```cd ./pencils-and-more/api```
- Run -> 
	```composer update```
- Create configuration file named ".env" in the api folder root. Put the following contents in that file, editing the DB connection details for your MySQL connection: 
```ini
APP_ENV=local
APP_DEBUG=true
APP_KEY=M16X94w3X3G1EDfDu1LT6O2OqjXgHZmP

DB_CONNECTION=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=pencils-and-more
DB_USERNAME=test
DB_PASSWORD=test123

CACHE_DRIVER=memcached
QUEUE_DRIVER=sync
```
- Run migrations to create needed database tables -> ```php artisan migrate```


## Running the API

- Go to public directory -> ```cd ./public```
- Serve applicaton -> ```php -S localhost:1234```
