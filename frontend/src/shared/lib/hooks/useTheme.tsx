import { useLayoutEffect, useState } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(false);
  useLayoutEffect(() => {
    const handler = (e?: MediaQueryListEvent) => {
      if (
        e?.matches ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      )
      {
        document.body.classList.add('dark');
        setIsDark(true);
      } else
      {
        document.body.classList.remove('dark');
        setIsDark(false);
      }
    };

    handler();

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', handler);

    return () => {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .removeEventListener('change', handler);
    };
  }, []);

  return { isDark };
}
