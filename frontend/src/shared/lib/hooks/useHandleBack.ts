import { useEffect } from 'react';

import { backButton } from '@telegram-apps/sdk-react';

export function useHandleBack(handler: () => void, isVisible: boolean) {
  // const backButton = useBackButton();

  useEffect(() => {
    if (isVisible && backButton.isSupported())
    {
      backButton.show();
      backButton.onClick(handler);
    }
    return () => {
      if (backButton.isSupported()) backButton.hide();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible]);
}
