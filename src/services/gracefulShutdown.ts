import { logger } from 'ethers';
import { WAITING_TIME_FOR_SHUTDOWN } from 'constants/graceful';

class Health {
  private status: boolean;

  constructor() {
    this.status = true;
  }

  getStatus() {
    return this.status;
  }

  setStatus(status: boolean) {
    this.status = status;
  }
}

export const health = new Health();

export const terminator = (signal: string) => {
  logger.info(`Received ${signal}: cleaning up`);
  health.setStatus(false);
  setTimeout((...args) => {
    logger.info(args);
    process.exit(0);
  }, WAITING_TIME_FOR_SHUTDOWN);
};
