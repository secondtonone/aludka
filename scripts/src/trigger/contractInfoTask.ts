import { envvars, logger, schedules } from '@trigger.dev/sdk/v3';
import { contractInfoToDb } from '../contractInfoToDb';

export const contractInfoTask = schedules.task({
  id: 'contract-info-task',
  cron: '* * * * *',
  maxDuration: 300,
  run: async (payload, { ctx }) => {
    const distanceInMs =
      payload.timestamp.getTime() -
      (payload.lastTimestamp ?? new Date()).getTime();

    logger.log('Contract info task', { payload, distanceInMs });

    const variables = await envvars.list(ctx.project.ref, ctx.environment.slug);

    const env = variables.reduce((acc, variable) => ({ ...acc, [variable.name]: variable.value }), {} as Record<string, string>);

    await contractInfoToDb(env);

    logger.log('Done.');
  },
});
