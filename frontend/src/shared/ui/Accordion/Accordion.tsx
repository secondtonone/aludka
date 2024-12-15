import { useState, type FC } from 'react';

import { Accordion as TgAccordion } from '@telegram-apps/telegram-ui';
import { AccordionContent } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionContent/AccordionContent';
import { AccordionSummary } from '@telegram-apps/telegram-ui/dist/components/Blocks/Accordion/components/AccordionSummary/AccordionSummary';

import s from './Accordion.module.css';

export interface AccordionProps {
  onChange?: () => void;
  expanded?: boolean;
  content: {
    title: React.ReactNode
    text: React.ReactNode
  }[]
}

export const Accordion: FC<AccordionProps> = ({ content }) => {
  const [expanded, setExpanded] = useState<boolean[]>(Array.from({ length: content.length }).map(() => false));

  return (<div className="flex flex-col gap-[10px]">
    {content.map((item, index) => (
      <div key={index} className={`${s.accordion} bg-white dark:bg-black rounded-xl shadow border border-whity overflow-hidden *:px-4`}>
        <TgAccordion onChange={() => setExpanded((prev) => prev.map((isExpanded, i) => i === index ? !isExpanded : isExpanded))} expanded={expanded[index]}>
          <AccordionSummary className="!px-4">
            {item.title}
          </AccordionSummary>
          <AccordionContent className="dark:bg-black bg-white">
            <div className="text-gray_dark dark:text-gray_light text-sm font-normal leading-none pb-4 pt-0">
              {item.text}
            </div>
          </AccordionContent>
        </TgAccordion>
      </div>
    ))}
  </div>
  );
};
