import { Bot } from 'grammy';

import { errorLogger, logger } from './logger';
import { startCommandConstructor } from './start';

const token = process.env.BOT_TOKEN;
// const adminId = parseInt(process.env.ADMIN_TG_ID || '');
const isProd = process.env.NODE_ENV === 'production';

if (!token) throw new Error('BOT_TOKEN is unset');

const bot = new Bot(token);

bot.use(logger);
bot.catch(errorLogger);

const startCommand = startCommandConstructor((ctx) => {
  /* const lang = ctx.msg?.from?.language_code;
  const user = ctx.msg?.from;
  const telegramId = user?.id;
  const params = ctx?.match || ''; */

  /* if (mixpanel && isProd)
    {
      mixpanel.people.set(`${telegramId}`, {
        $name: `${user?.first_name} ${user?.last_name}`,
        $lang: lang,
        $chat_id: ctx.msg?.chat?.id,
      });
  
      mixpanel.track('Bot', {
        Command: 'Start',
        From: params,
        $name: `${user?.first_name} ${user?.last_name}`,
        $lang: lang,
        $chat_id: ctx.msg?.chat?.id,
      });
    } */
});

bot.command('start', startCommand);

bot.on('pre_checkout_query', async (ctx) => ctx.answerPreCheckoutQuery(true).catch(() => {
  console.error('answerPreCheckoutQuery failed');
}));

bot.on('message:successful_payment', async (ctx) => {
  if (!ctx.message || !ctx.message.successful_payment || !ctx.from)
  {
    return;
  }
});

export default bot;
