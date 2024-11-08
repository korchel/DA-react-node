import { ReactNode } from 'react';
import clsx from 'clsx';

interface IPageTitleProps {
  children: ReactNode;
  className?: string;
}

export const Title = ({ children, className }: IPageTitleProps) => {
  return (
    <h1
      className={clsx(
        className,
        `leading-none font-bold text-center
        text-secondary dark:text-whiteDark
        text-sx sm:text-sm md:text-lg`,
      )}
    >
      {children}
    </h1>
  );
};
