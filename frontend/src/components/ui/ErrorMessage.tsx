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
      'absolute text-xs first-line:sm:text-sm leading-tight text-danger dark:text-[#e67a71]',
    )}
  >
    {children}
  </p>
);
