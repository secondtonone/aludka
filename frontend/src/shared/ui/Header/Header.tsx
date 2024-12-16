import { TonConnectButton } from '@tonconnect/ui-react';

import s from './Header.module.css';

export function Header() {
  return (
    <header className="flex flex-col items-center justify-between px-4 py-3">
      <TonConnectButton className={`${s.tonButton} m-0`} />
    </header>
  );
}
