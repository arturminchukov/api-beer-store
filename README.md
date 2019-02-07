#api-beer-store

##stack
 postgresql database - 10.6\
 node - 10.14.1
 

##start the project
####`npm i`


If you don't have a database you must create it with the command
####`DB_HOSTNAME=DBHOSTNAME  DB_USERNAME=USERNAME DB_PASSWORD=PASSWORD DB_NAME=DATABASENAME npm run create`

where 

    DBHOST - host where placed your database,
    USERNAME - user of postgres database
    PASSWORD - password for this user
    DATABASENAME - name of database what you want create
 
####`DB_HOSTNAME=DBHOSTNAME  DB_USERNAME=USERNAME DB_PASSWORD=PASSWORD DB_NAME=DATABASENAME npm run migrate` 

where 

    DBHOST - host where placed your database,
    USERNAME - user of postgres database
    PASSWORD - password for this user
    DATABASENAME - name of database what you want create



####`DBHOST=DBHOSTNAME  USER=USERNAME PASSWORD=PASSWORD DATABASE=DATABASENAME npm run start`
    
where 

    DBHOST - host where placed your database,
    USERNAME - user of postgres database
    PASSWORD - password for this user
    DATABASENAME - name of database that you have entered in previous step


