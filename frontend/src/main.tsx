import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { App } from '@/app/App';
import '@/app/i18n';

import '@/app/global.css';
import config from '@/config';
import { init } from '@/platform/tg/init';
import '@telegram-apps/telegram-ui/dist/styles.css';
import mixpanel from 'mixpanel-browser';

// Mock the environment in case, we are outside Telegram.
// import './mockEnv.ts';

mixpanel.init(config.mixpanelToken, {
  debug: import.meta.env.DEV,
  track_pageview: true,
});


const root = ReactDOM.createRoot(document.getElementById('root')!);

// Configure all application dependencies.
init(import.meta.env.DEV);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
