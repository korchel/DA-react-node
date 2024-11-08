import clsx from 'clsx';
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  variant: 'primary' | 'outline' | 'danger' | 'highLighted' | 'borderLess';
}

export const ButtonComponent = ({
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  const cn = clsx(
    className,
    'transition-colors',
    'rounded-sm',
    'p-2',
    'leading-none',
    'h-[34px]',
    'sm:h-[38px]',
    'md:h-[42px]',
    'cursor-pointer',
    'box-border',
    'text-nowrap',
    {
      primary: `bg-secondary hover:bg-secondaryHover
        dark:bg-secondaryDark dark:hover:bg-secondaryDarkHover
        text-white dark:text-whiteDark
        dark:border dark:border-whiteDark`,
      outline: `border-2 border-secondary bg-white text-secondary hover:bg-whiteHover
        dark:border-whiteDark dark:hover:border-whiteDarkHover
        dark:bg-whiteDark dark:text-primaryDark dark:hover:bg-whiteDarkHover`,
      danger: `bg-danger hover:bg-dangerHover text-white 
        dark:bg-dangerDark dark:text-whiteDark`,
      borderLess: `bg-white text-secondary hover:bg-whiteHover !rounded-none
      dark:bg-whiteDark dark:text-primaryDark dark:hover:bg-whiteDarkHover`,
    }[variant],
  );

  return (
    <button className={cn} {...props}>
      {children}
    </button>
  );
};
