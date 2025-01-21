import { useSignal, viewport as vp } from '@telegram-apps/sdk-react';

export function useFullscreenOptions() {
  const isFullscreen = useSignal(vp.isFullscreen);

  const safeAreaInsetTop = vp.safeAreaInsetTop();
  const contentSafeAreaInsetTop = vp.contentSafeAreaInsetTop();

  const safeAreaInsetBottom = vp.safeAreaInsetBottom();
  const contentSafeAreaInsetBottom = vp.contentSafeAreaInsetBottom();

  return {
    safeAreaInsetTop,
    contentSafeAreaInsetTop,
    isFullscreen,
    totalSafeAreaTop: safeAreaInsetTop + contentSafeAreaInsetTop,
    totalSafeAreaBottom: safeAreaInsetBottom + contentSafeAreaInsetBottom,
    safeAreaInsetBottom,
    contentSafeAreaInsetBottom,
  };
}
