import { envvars, logger, schedules } from '@trigger.dev/sdk/v3';

export const contractInfoTask = schedules.task({
  id: 'contract-info-task',
  // Every hour
  cron: '* * * * *',
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300, // Stop executing after 300 secs (5 mins) of compute
  run: async (payload, { ctx }) => {
    const distanceInMs =
      payload.timestamp.getTime() -
      (payload.lastTimestamp ?? new Date()).getTime();

    logger.log('Contract info task', { payload, distanceInMs });

    const variables = await envvars.list();

    for (const variable of variables) {
      logger.log(`Name: ${variable.name}, Value: ${variable.value}`);
    }

    logger.log('Done.');
  },
});
