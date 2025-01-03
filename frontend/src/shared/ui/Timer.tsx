import { FC, useEffect, useState } from 'react';

import { getPlural } from '../lib';

export const Timer: FC<{ timestamp: number }> = ({ timestamp }) => {
  const [timeLeft, setTimeLeft] = useState('');

  const calculateTimeLeft = () => {
    const hours = Math.floor(timestamp / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timestamp % (1000 * 60 * 60)) / (1000 * 60)
    );
    setTimeLeft(
      `${hours} ${getPlural(hours, ['час', 'часа', 'часов'])} ${minutes} ${getPlural(minutes, ['минута', 'минуты', 'минут'])}`
    );
  };

  useEffect(() => {
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [timestamp]);

  return (
    <div className="h-11 flex-col justify-center items-center gap-1 flex">
      <div className="text-center text-[#1e1e1e] dark:text-whity text-xl font-semibold font-['Inter'] leading-normal">
        {timeLeft}
      </div>
      <div className="text-center text-[#646368] dark:text-whity text-xs font-normal font-['Inter'] leading-none">
        До конца раунда
      </div>
    </div>
  );
};
