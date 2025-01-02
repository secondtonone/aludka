// import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import { QueryClientProvider } from '@tanstack/react-query';
import { AppRoot } from '@telegram-apps/telegram-ui';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { queryClient, useTheme } from '@/shared';
import { routes } from './routes';

export function App() {
  // const lp = useLaunchParams();

  const { isDark } = useTheme();

  return (
    <AppRoot
      appearance={isDark ? 'dark' : 'light'}
      platform={/* ['macos', 'ios'].includes(lp.platform) ? 'ios' :  */ 'base'}
    >
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
    </AppRoot>
  );
}
