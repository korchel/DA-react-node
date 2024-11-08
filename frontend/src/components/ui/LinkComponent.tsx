import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface ILinkComponent {
  route: string;
  children: ReactNode;
  className?: string;
  active?: boolean;
}

export const LinkComponent = ({
  route,
  children,
  active,
  className,
}: ILinkComponent) => {
  return (
    <Link
      to={route}
      className={clsx(
        className,
        'block h-9 leading-9 w-full md:w-fit',
        'transition-colors',
        active
          ? 'text-highlight dark:text-highlightDark'
          : 'text-secondary dark:text-whiteDark md:hover:text-highlight dark:hover:text-highlightDark',
      )}
    >
      {children}
    </Link>
  );
};
