# api-beer-store

## stack of technologies
 [postgresql database](https://www.postgresql.org) - 10.6\
 [nodejs](https://nodejs.org/en/) - 10.14.1
 

## initialize the project

`npm i`

### database

    DBHOST - host where placed your database,as default 'localhost'
    USERNAME - user of postgres database,as default 'postgres' 
    PASSWORD - password for this user
    DATABASENAME - name of project database, as default 'beer_store'

to add new migration:

`DB_HOST=DBHOST DB_USERNAME=USERNAME DB_PASSWORD=PASSWORD DB_NAME=DATABASENAME npm run migration-create 'MIGRATION_NAME'`

to apply migration:

`DB_HOST=DBHOST DB_USERNAME=USERNAME DB_PASSWORD=PASSWORD DB_NAME=DATABASENAME npm run migration-apply`

to undo migration:

`DB_HOST=DBHOST DB_USERNAME=USERNAME DB_PASSWORD=PASSWORD DB_NAME=DATABASENAME npm run migration-undo`

    
## start project
parameters

    DBHOST - host where placed your database,
    USERNAME - user of postgres database
    PASSWORD - password for this user
    DATABASENAME - name of database that you have entered in previous step
    SERVERPORT - port, on which you want to start server
    DEBUG - 'true' for debug mode

`DBHOST=DBHOSTNAME  USER=USERNAME PASSWORD=PASSWORD DATABASE=DATABASENAME SERVER_PORT=SERVERPORT npm run start`

## Usage

[swagger api](https://app.swaggerhub.com/apis-docs/arturminchukov/swagger-beer_store/1.0.0) - v1\

