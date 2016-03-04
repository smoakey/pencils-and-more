# Pencils and More

A simple crud app for managing a pencil inventory API built with the Lumen framework https://lumen.laravel.com, and Angular 1.5 for the client. 


## Requirements

- PHP > 5.5.9
- MySQL
- Composer (https://getcomposer.org/)
- Node > 4.x
- NPM > 3.x


## Downloading
 - Clone Repo -> 
	```git clone https://github.com/smoakey/pencils-and-more.git pencils-and-more```


## Installing the API

- Go to api folder -> 
	```cd ./pencils-and-more/api```
- Install dependencies -> 
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


## Installing the Client

- Go to client folder (open a new terminal tab or window) -> ```cd ./pencils-and-more/client```
- Install Dependencies -> ```npm install``` (this will install bower dependencies after npm is done)


## Running the Client

- Serve application ```gulp```

## Using the Client

- The client is served on http://localhost:1111 & knows that the API is being hosted on http://localhost:1234
