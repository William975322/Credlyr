import app from "./app";
import { logger } from "./lib/logger";

const rawPort = process.env["PORT"];

if (rawPort) {
  const port = Number(rawPort);
  if (!Number.isNaN(port) && port > 0) {
    app.listen(port, () => {
      logger.info({ port }, "Server listening");
    });
  } else {
    logger.error({ rawPort }, "Invalid PORT value");
    process.exit(1);
  }
} else {
  logger.info("PORT environment variable not set, running in serverless mode");
}

export default app;
