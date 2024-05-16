const { CronJob } = require("cron");
const { logger } = require("./src/lib/logger");
const { executeBackup } = require("./src/backup");
const { createServer } = require("node:http");

const dotenv = require("dotenv");

dotenv.config();

const server = createServer();

async function main() {
  const cron = CronJob.from({
    cronTime: "0 12 * * 2",
    onTick: () => {
      logger.info(`🔄 Cron Job do their job `);
      executeBackup();
    },
    start: true,
    timeZone: "America/Los_Angeles"
  });
}

main()
  .then(() => {
    logger.info(`Cron Job Start. `);
  })
  .catch((err) => {
    logger.error("Error exeption, when trying to start cron job");
    console.log(err);
  });

const dev = process.env.NODE_ENV;

server.listen(process.env.PORT, "127.0.0.1", (err) => {
  if (err) {
    logger.error("Error exeption when trying to start the server");
    console.error(err);
  }

  logger.info(
    `Server running on ${dev} Listening at Port ::${process.env.PORT}`
  );
});
