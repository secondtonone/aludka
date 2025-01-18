import { type Locales, TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from '@/app/App';
import { publicUrl } from '@/shared';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './ErrorBoundary';

import {
  initDataUser,
  isTMA,
  miniApp,
  swipeBehavior,
  viewport as vp,
} from '@telegram-apps/sdk-react';

function ErrorBoundaryError({ error }: { error: unknown }) {
  return (
    <div>
      <p>An unhandled error occurred:</p>
      <blockquote>
        <code>
          {error instanceof Error
            ? error.message
            : typeof error === 'string'
              ? error
              : JSON.stringify(error)}
        </code>
      </blockquote>
    </div>
  );
}

export function Root() {
  const { i18n: { language, changeLanguage } } = useTranslation();
  const initData = initDataUser();
  const lang = initData?.languageCode || language.split('-')[0];

  useEffect(() => {
    if (isTMA('simple'))
    {
      vp.expand();
      if (swipeBehavior.isSupported()) swipeBehavior.disableVertical();
      miniApp.ready();
    }
  }, []);

  useEffect(() => {
    if (lang !== language) changeLanguage(lang);
  }, [changeLanguage, lang, language]);

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')} language={language as Locales}>
        <App />
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
