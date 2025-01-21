/* import { useNavigate } from 'react-router-dom';
import { backButton } from '@telegram-apps/sdk-react'; */
import { Header, useFullscreenOptions } from '@/shared';
import { PropsWithChildren /* useEffect */ } from 'react';

interface PageProps extends PropsWithChildren {
  hideHeader?: boolean
}

export function Page({
  hideHeader,
  children /* , back = true  */,
}: PageProps) {
  const { isFullscreen, totalSafeAreaTop } = useFullscreenOptions();

  return (
    <main className="flex flex-col h-screen w-full justify-start items-center text-blacky bg-white dark:bg-black dark:text-white" style={{
      paddingTop: isFullscreen ? `${totalSafeAreaTop}px` : 0,
    }}>
      <div className="max-w-md w-full h-full">
        {hideHeader ? null : <Header />}
        <div className="p-4 py-3 flex flex-col gap-4 h-full">
          {children}
        </div>
      </div>
    </main>
  );
}
