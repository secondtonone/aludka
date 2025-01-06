import { type Locales, TonConnectUIProvider } from '@tonconnect/ui-react';

import { App } from '@/app/App';
import { publicUrl } from '@/shared';
import { useTranslation } from 'react-i18next';
import { ErrorBoundary } from './ErrorBoundary';

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
  const { i18n: { language } } = useTranslation();
  const lang = language.split('-')[0] as Locales;

  return (
    <ErrorBoundary fallback={ErrorBoundaryError}>
      <TonConnectUIProvider manifestUrl={publicUrl('tonconnect-manifest.json')} language={lang}>
        <App />
      </TonConnectUIProvider>
    </ErrorBoundary>
  );
}
