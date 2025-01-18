import { GrammyError, HttpError, type BotError, type Context, type NextFunction } from 'grammy';

export const logger = async (ctx: Context, next: NextFunction) => {
  console.log(ctx.msg);
  await next();
};

export const errorLogger = (err: BotError<Context>) => {
  const ctx = err.ctx;
  console.error(`Error while handling update ${ctx.update.update_id}:`);
  const e = err.error;
  if (e instanceof GrammyError)
  {
    console.error('Error in request:', e.description);
  } else if (e instanceof HttpError)
  {
    console.error('Could not contact Telegram:', e);
  } else
  {
    console.error('Unknown error:', e);
  }
};
