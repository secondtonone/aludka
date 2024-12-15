import type { ComponentType, JSX } from 'react';

import { FAQPage } from '@/pages/FAQPage/FAQPage';
import { IndexPage } from '@/pages/IndexPage/IndexPage';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './layouts/RootLayout';

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
];

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        Component: IndexPage,
        children: [
          { path: '/my-covers',  Component: IndexPage },
          { path: '/faq',  Component: FAQPage },
          { path: '/cover/:cover', Component: IndexPage },
          {
            path: '/buy',
            Component: IndexPage,
          },
        ]
      },
    ],
  },
]);
