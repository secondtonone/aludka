import Mixpanel from 'mixpanel';

const mixPanelToken = process.env.MIXPANEL_TOKEN;
const isProd = process.env.NODE_ENV === 'production';

function getMixpanel(): typeof Mixpanel | null {
  if (mixPanelToken && isProd)
  {
    return Mixpanel.init(mixPanelToken, {
      host: 'api-eu.mixpanel.com',
    });
  }
  return null;
}

export default getMixpanel();
