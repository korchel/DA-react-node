import { DetailedHTMLProps, LabelHTMLAttributes, ReactNode } from 'react';

interface IInputLabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {
  required?: boolean;
  children: ReactNode;
}

export const InputLabel = ({
  required = true,
  children,
  ...props
}: IInputLabelProps) => {
  return (
    <label
      className='absolute -top-2.5 left-1  text-sm leading-tight mx-2 z-10
        bg-white text-secondary
        dark:bg-secondaryDark dark:text-whiteDark'
      {...props}
    >
      {children}
      {required && '*'}
    </label>
  );
};
