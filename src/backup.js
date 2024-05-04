const { exec } = require("child_process");

const date = new Date();

const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const backupPath = process.env.BACKUP_PATH;

let shellScript = `mysqldump -u ${username} -p${password} ${dbName} > ${backupPath}/${date.getFullYear()}-${date.getMonth()}-${date.getDay()}At[${date.getHours()}:${date.getMinutes()}]-backup-${host}.sql`;

function executeBackup() {
  exec(shellScript, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
}

module.exports = { executeBackup };
