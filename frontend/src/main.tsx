import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import '@/app/i18n';
import { Root } from '@/app/layouts';

import '@/app/global.css';
import { init } from '@/platform/tg/init';
import '@telegram-apps/telegram-ui/dist/styles.css';

// Mock the environment in case, we are outside Telegram.
// import './mockEnv.ts';

const root = ReactDOM.createRoot(document.getElementById('root')!);

// Configure all application dependencies.
init(import.meta.env.DEV);

root.render(
  <StrictMode>
    <Root />
  </StrictMode>
);
