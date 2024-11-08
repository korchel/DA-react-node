import clsx from 'clsx';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  InputHTMLAttributes,
  ReactNode,
} from 'react';
import { FieldError } from 'react-hook-form';
import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';

export interface InputFieldProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  type?: 'text' | 'email' | 'password' | 'number';
  error?: FieldError;
  placeholder?: string;
  label?: string;
  actionButton?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField = forwardRef(
  (
    {
      type = 'text',
      error,
      placeholder,
      label,
      className,
      actionButton = null,
      onChange,
      ...props
    }: InputFieldProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <div className={clsx(className, 'relative')}>
        {label && <InputLabel htmlFor={label}>{label}</InputLabel>}
        <input
          type={type}
          id={label}
          className={clsx(
            error ? 'border-danger' : 'border-secondary',
            'block p-2 border bg-transparent rounded-sm w-full',
            'placeholder:text-gray dark:placeholder:text-whiteDark',
            'outline-none',
            'focus:ring focus:ring-primary focus:ring-opacity-50',
            'dark:border-whiteDark dark:focus:ring-primaryDark',
            'autofill:shadow-[inset_0_0_0px_1000px_var(--white-color)] autofill:[-webkit-text-fill-color:_var(--secondary-color)]',
            'dark:autofill:shadow-[inset_0_0_0px_1000px_var(--secondary-dark-color)] dark:autofill:[-webkit-text-fill-color:_var(--white-dark-color)]',
          )}
          placeholder={placeholder}
          {...props}
          ref={ref}
          onChange={onChange}
        />
        {actionButton}
        {error && <ErrorMessage>{error.message}</ErrorMessage>}
      </div>
    );
  },
);
