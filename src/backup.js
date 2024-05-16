const { exec } = require("child_process");
const { logger } = require("./lib/logger");
const { getReadableCurrentDate } = require("./get-full-date");
const dotenv = require("dotenv");
const { randomUUID } = require("crypto");
const path = require("path");
const fs = require("fs");

dotenv.config();

const date = new Date();

/**
 * Represents a code snippet that retrieves database connection information and backup path.
 *
 * This code snippet retrieves the host, username, password, database name, and backup path from environment variables.
 * These values are used for database connection and backup operations.
 *
 * @returns {void}
 */
const host = process.env.DB_HOST;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const backupPath = process.env.BACKUP_PATH;

/**
 * Executes a backup of the database.
 *
 * This function generates a backup file for the specified database using the mysqldump command.
 * The backup file is named with the current date, host, and a random UUID.
 * The backup file is saved to the specified backup path.
 * If the backup path does not exist, the function creates the directory.
 *
 * @returns {void}
 */
function executeBackup() {
  const currentDate = getReadableCurrentDate(date)
    .replace(", ", " ")
    .split(" ")
    .map((a) => a.toUpperCase())
    .join("");

  const backupFile = `[${currentDate}]_backup_${host}_${randomUUID()}.sql`;
  const backupFilePath = path.join(backupPath, backupFile);

  if (!fs.existsSync(backupPath)) {
    logger.info("Directory doesn't exist, Worker try to create one");
    fs.mkdirSync(backupPath, { recursive: true });
    logger.info(`Directory created locate at: ${backupPath}`);
  }

  let shellScript = `mysqldump -u ${username} -p${password} ${dbName} > ${backupFilePath}`;

  exec(shellScript, (error, stdout, stderr) => {
    if (error) {
      console.log(error.message);
      logger.error(`❌ Something went wrong failed to Execute Backup`);
      return;
    }

    logger.info(`✅ Cron Job sucessfully execute without problem `);
    logger.info(`🗂 Backup Located At ${process.env.BACKUP_PATH} `);
  });
}

module.exports = { executeBackup };
