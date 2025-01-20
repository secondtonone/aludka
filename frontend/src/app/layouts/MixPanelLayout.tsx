// import { useLaunchParams, miniApp, useSignal } from '@telegram-apps/sdk-react';
import {
  initDataUser
} from '@telegram-apps/sdk-react';
import { useTonAddress } from '@tonconnect/ui-react';
import mixpanel from 'mixpanel-browser';
import { PropsWithChildren, useEffect } from 'react';
import { useTranslation } from 'react-i18next';


export function MixPanelLayout({ children }: PropsWithChildren) {
  const { i18n: { language: lang } } = useTranslation();
  const initData = initDataUser();
  const userFriendlyAddress = useTonAddress();

  const userId = initData?.id || userFriendlyAddress;

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
    <>{children}</>
  );
}
