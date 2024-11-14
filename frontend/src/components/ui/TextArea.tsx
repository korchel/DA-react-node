import clsx from 'clsx';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  TextareaHTMLAttributes,
} from 'react';

import { InputLabel } from './InputLabel';
import { ErrorMessage } from './ErrorMessage';

export interface ITextAreaProps
  extends DetailedHTMLProps<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  error?: string;
  placeholder?: string;
  label?: string;
  required?: boolean;
}

export const TextArea = forwardRef(
  (
    { error, placeholder, label, className, ...props }: ITextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    return (
      <div className={clsx(className, 'relative')}>
        <InputLabel htmlFor={label}>{label}</InputLabel>
        <textarea
          className={clsx(
            error
              ? 'border-danger  dark:border-errorDark'
              : 'border-secondary dark:border-whiteDark',
            'block p-2 min-h-44',
            'border outline-none rounded-sm w-full bg-transparent focus:ring focus:ring-primary focus:ring-opacity-50',
            'dark:focus:ring-primaryDark',
          )}
          placeholder={placeholder}
          {...props}
          ref={ref}
          id={label}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </div>
    );
  },
);
