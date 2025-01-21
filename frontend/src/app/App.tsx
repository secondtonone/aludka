// import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { publicUrl, queryClient, useTheme } from '@/shared';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  initDataUser,
  isTMA,
  miniApp,
  retrieveLaunchParams,
  swipeBehavior,
  viewport as vp
} from '@telegram-apps/sdk-react';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { Locales, TonConnectUIProvider } from '@tonconnect/ui-react';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ErrorBoundary, MixPanelLayout } from './layouts';
import { routes } from './routes';


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

export function App() {
  const { isDark } = useTheme();
  const { i18n: { language, changeLanguage } } = useTranslation();
  const initData = initDataUser();
  const lang = initData?.languageCode || language.split('-')[0];

  useEffect(() => {
    if (lang !== language) changeLanguage(lang);
  }, [changeLanguage, lang, language]);

  useEffect(() => {
    if (isTMA('simple'))
    {
      vp.expand();
      if (swipeBehavior.isSupported()) swipeBehavior.disableVertical();
      miniApp.ready();
    }
  }, []);

  useEffect(() => {
    const handler = async () => {
      const { platform } = retrieveLaunchParams();
      if (
        vp.requestFullscreen.isAvailable() &&
        platform &&
        (platform === 'ios' || platform === 'android')
      )
        await vp.requestFullscreen();
    }

    try
    {
      handler();
    } catch (error)
    {
      console.log('Not in TG :)');
    }
  }, []);


  const userId = initData?.id;

  useEffect(() => {
    const handler = async () => {
      mixpanel.identify(`${userId}`);
      mixpanel.people.set({
        $lang: lang,
      });
    };

    if (userId && lang !== undefined) handler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')} language={language as Locales}>
        <AppRoot
          appearance={isDark ? 'dark' : 'light'}
          platform={/* ['macos', 'ios'].includes(lp.platform) ? 'ios' :  */ 'base'}
        >
          <MixPanelLayout>
            <QueryClientProvider client={queryClient}>
              <BrowserRouter>
                <Routes>
                  {routes.map((route) => (
                    <Route key={route.path} {...route} />
                  ))}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </BrowserRouter>
            </QueryClientProvider>
          </MixPanelLayout>
        </AppRoot>
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
