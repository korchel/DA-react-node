import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface ICard
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  children: ReactNode;
}

export const Card = ({ children, className }: ICard) => (
  <div
    className={clsx(
      className,
      `md:w-1/2 p-4 rounded-md shadow-lg 
    bg-white dark:bg-secondaryDark`,
    )}
  >
    {children}
  </div>
);

Card.Header = ({ children }) => (
  <h1 className='font-bold text-center uppercase'>{children}</h1>
);

Card.Body = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx(className, 'mt-5')}>{children}</div>;

Card.Footer = ({ children }) => (
  <div className='flex flex-col xs:flex-row justify-between gap-1 mt-5 bg-white dark:bg-secondaryDark'>
    {children}
  </div>
);
