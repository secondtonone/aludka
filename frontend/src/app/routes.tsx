import type { ComponentType, JSX } from 'react';

import { FAQPage } from '@/pages/FAQPage/FAQPage';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { WinnerPage } from '@/pages/WinnerPage/WinnerPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', title: 'Алексей Лудка', Component: IndexPage },
  { path: '/winners', title: 'Алексей Лудка | Победители', Component: WinnerPage },
  { path: '/faq', title: 'Алексей Лудка | FAQ', Component: FAQPage }
];
