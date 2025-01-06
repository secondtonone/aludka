import { FC, useEffect, useState } from 'react';

import { getPlural } from '../lib';

interface TimerProps {
  timestamp: number;
  onRestart: () => number;
}

export const Timer: FC<TimerProps> = ({ timestamp, onRestart }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [time, setTime] = useState(timestamp);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    const timerStart = () => {
      const hours = Math.floor(time / (1000 * 60 * 60));
      const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
      setTimeLeft(
        `${hours} ${getPlural(hours, ['час', 'часа', 'часов'])} ${minutes} ${getPlural(minutes, ['минута', 'минуты', 'минут'])}`
      );

      timer = setInterval(
        () => setTime((currentTime) => {
          const newTime = currentTime - 1000;
          if (newTime <= 0)
          {
            return onRestart();
          }
          return newTime;
        }),
        1000
      );
    };

    timerStart();

    return () => clearInterval(timer);
  }, [time]);

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
