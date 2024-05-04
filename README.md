## Cron Job Backup Database MySql Weely

> (You can also using another Sql Database but you need extra configuration)

For keeping the database have low memory usage i'm not use extra library for serving Web Server like ``(Express or Something Else..)`` instead of using the library i prefer doing the same thing 
just only using ``http:server`` from ``Node Js`` and for executing the shell script from node js i use ``child_process``. 

What case fit for this Cron Jobs Worker ?
 - Your app served in VPS
 - Your app using MySql for DBMS
 - Low Library Usage

DEFAULT CONFIG
  - Day = 'Friday'
  - Times = 23:00
  - Schedule = 'Weekly'

### Shell Script Config
```js
// make your own .env 
// Location ./src/backup.js

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const backupPath = process.env.BACKUP_PATH;
```
   


### Default Backup Script

```shell
# Location ./src/backup.js

mysqldump -u ${username} -p${password} ${dbName} > ${backupPath}/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}At[${date.getHours()}:${date.getMinutes()}]-backup-${host}.sql
```

### Default Executable Cron Jobs.
```js
// Location main.js

new CronJob(
    "* * 23 * * 5", // Make your own configuration
    function () {
      console.log("============== Cron Fire =============");
      executeBackup();
    },
    "Cron sucessfully execute without problem.",
    true,
   "America/Los_Angeles"
)
```

#### Refference Library 
  + [Cron Js](https://github.com/kelektiv/node-cron)
  + [Winston](https://www.npmjs.com/package/winston)
  + [dotenv](https://www.npmjs.com/package/dotenv)

#### Technolgy
  + Node Js v20.12.2
  + Package Manager (PNPM) v9.0.6


  
