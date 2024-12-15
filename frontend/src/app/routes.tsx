import type { ComponentType, JSX } from 'react';

import { FAQPage } from '@/pages/FAQPage/FAQPage';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { TONConnectPage } from '@/pages/TONConnectPage/TONConnectPage';

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: '/', title: 'Insured | Buy', Component: IndexPage },
  { path: '/my-covers', title: 'Insured | My covers', Component: IndexPage },
  { path: '/faq', title: 'Insured | FAQ', Component: FAQPage },
  { path: '/cover/:cover', title: 'Insured | Cover', Component: IndexPage },
  {
    path: '/buy',
    Component: IndexPage,
    title: 'Insured | Buy',
  },
  {
    path: '/ton',
    Component: TONConnectPage,
    title: 'Insured | Buy',
  },
];
