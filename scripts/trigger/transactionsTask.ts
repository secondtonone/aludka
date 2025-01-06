import { envvars, logger, schedules } from '@trigger.dev/sdk/v3';
import { transactionsToDb } from '../src/transactionsToDb';

export const transactionsTask = schedules.task({
  id: 'transactions-task',
  cron: '1 0 * * *',
  maxDuration: 300,
  run: async (payload, { ctx }) => {
    const distanceInMs =
      payload.timestamp.getTime() -
      (payload.lastTimestamp ?? new Date()).getTime();

    logger.log('Transactions task', { payload, distanceInMs });

    const variables = await envvars.list(ctx.project.ref, ctx.environment.slug);

    const env = variables.reduce((acc, variable) => ({ ...acc, [variable.name]: variable.value }), {} as Record<string, string>);

    await transactionsToDb(env);

    logger.log('Done.');
  },
});
