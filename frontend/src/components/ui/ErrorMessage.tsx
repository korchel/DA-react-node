import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

interface IErrorMessage
  extends DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement> {
  children: ReactNode;
}

export const ErrorMessage = ({ children, className }: IErrorMessage) => (
  <p
    className={clsx(
      className,
      'absolute text-xs sm:text-sm leading-tight text-danger dark:text-errorDark',
    )}
  >
    {children}
  </p>
);
