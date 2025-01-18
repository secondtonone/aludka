import type { CommandContext, Context } from 'grammy';
// import { ulid } from 'ulid';
import getMessages from './messages';

const webApp = process.env.WEB_APP || '';
const webAppTg = `${webApp}/tg`;
const isProd = process.env.NODE_ENV === 'production';

export const startCommandConstructor = (callback: (ctx: CommandContext<Context>) => void) => async (ctx: CommandContext<Context>) => {
  const lang = ctx.msg?.from?.language_code;
  
  const { introductionMessage, start, subscribe, channelUrl } = getMessages(lang);

  if (typeof callback === 'function') callback(ctx);

  /* if (telegramId && lang) {
    const dbUser = await getUserByTgId(`${telegramId}`);

    const userId = dbUser?.userId;

    if (!userId) {
      await preparedUserModule.insertUser({
        telegramId: `${telegramId}`,
        lang,
        refId: ulid(),
      });
    }

    await client.end();
  } */

  return await ctx.api.sendAnimation(
    ctx.msg?.chat?.id,
    isProd ? `${webApp}/light.mp4` : 'https://grandgalore.vercel.app/light.mp4',
    {
      caption: introductionMessage,
      reply_markup: {
        inline_keyboard: [
          [{ text: start, web_app: { url: webAppTg ?? '' } }],
          [{ text: subscribe, url: channelUrl }],
        ],
      },
    }
  );
};
