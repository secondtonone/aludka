import { type FC } from 'react';

import { HelpIcon } from '@/shared';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

export const FAQPanel: FC = () => {
  const { t } = useTranslation();

  return (
    <Link to="/faq" className="px-4 py-2.5 bg-transparent rounded-xl shadow border border-whity justify-between items-center flex">
      <div className="text-black dark:text-white text-sm font-semibold">{t('FAQ')}</div>
      <div className="text-black dark:text-white"><HelpIcon /></div>
    </Link>
  );
};
