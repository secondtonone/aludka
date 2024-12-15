import { TonConnectButton } from '@tonconnect/ui-react';

import s from './Header.module.css';

export function Header() {
  return (
    <header className="flex flex-row items-center justify-between px-4 py-3">
      <h1 className="text-xl font-bold uppercase leading-loose tracking-tight text-blacky dark:text-white m-0">
        Insurance
      </h1>
      <TonConnectButton className={`${s.tonButton} m-0`} />
    </header>
  );
}
