import { logger, schedules, wait } from '@trigger.dev/sdk/v3';

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

    // Wait for 5 seconds
    await wait.for({ seconds: 5 });

    // Format the timestamp using the timezone from the payload
    const formatted = payload.timestamp.toLocaleString('en-US', {
      timeZone: payload.timezone,
    });

    logger.log('Done.');
  },
});
