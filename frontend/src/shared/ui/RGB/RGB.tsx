import { classNames, type RGB as RGBType } from '@telegram-apps/sdk-react';
import type { FC } from 'react';

import './RGB.css';

export type RGBProps = {
  color: RGBType;
  className?: string;
};

export const RGB: FC<RGBProps> = ({ color, className, ...rest }) => (
  <span {...rest} className={classNames('rgb', className)}>
    <i className="rgb__icon" style={{ backgroundColor: color }} />
    {color}
  </span>
);
