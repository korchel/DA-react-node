/* eslint-disable @typescript-eslint/no-explicit-any */
import clsx from 'clsx';
import {
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  HtmlHTMLAttributes,
} from 'react';

interface ICheckBox
  extends DetailedHTMLProps<
    HtmlHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string;
  onChange?: (e: any) => void;
  value?: any;
  checked?: boolean;
  disabled?: boolean;
}

export const CheckBox = forwardRef(
  (
    { label, value, checked, onChange, disabled = false, ...props }: ICheckBox,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    return (
      <label
        htmlFor={label}
        className={clsx('flex gap-1 justify-between items-center', !disabled && 'cursor-pointer')}
      >
        {label}
        <input
          id={label}
          type='checkbox'
          onChange={onChange}
          checked={checked}
          value={value}
          className='absolute opacity-0 h-0 w-0 peer'
          ref={ref}
          disabled={disabled}
          {...props}
        />
        <span
          className="relative inline-block h-4 w-4 border border:white dark:border:whiteDark rounded-sm
        after:content-[''] after:absolute after:hidden after:bottom-1 after:left-0.5 after:w-3 after:h-5
        after:border-r-[3px] after:border-b-[3px] after:border-highlight after:rotate-45 after:z-10
        dark:after:border-highlightDark
        peer-checked:after:block"
        />
      </label>
    );
  },
);
