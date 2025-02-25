const messages = {
  ru: {
    introductionMessage: `Добро пожаловать`,
    start: 'Войти',
    subscribe: 'Подписаться на канал',
    channelUrl: 'https://t.me/aludka',
  },
  en: {
    introductionMessage: `Welcome`,
    start: "Enter",
    subscribe: 'Subscribe to the channel',
    channelUrl: 'https://t.me/aludka',
  }
} as const;

const getMessages = (lang?: string) => {
  return lang &&lang in messages ? messages[lang as keyof typeof messages] : messages['en'];
}


export default getMessages;
