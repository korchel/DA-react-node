import { FieldError } from 'react-hook-form';
import Select from 'react-select';

import { InputLabel } from '../InputLabel';
import { ErrorMessage } from '../ErrorMessage';
import { ISelectOption, onSelect } from './../../../interfaces';
import { EmotionCacheProvider } from './EmotionProvider';
import { classNames } from './styles';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface ISelectInputProps {
  onChange: (option: number) => void;
  placeholder?: string;
  selectOptions: ISelectOption[];
  error?: FieldError;
  value: number;
  label?: string;
  required?: boolean;
  className?: string;
}

export const SelectComponent = forwardRef(
  (
    {
      onChange,
      placeholder,
      selectOptions,
      label,
      error,
      value,
      required = true,
      className,
      ...props
    }: ISelectInputProps,
    ref: ForwardedRef<null>,
  ) => {
    const handleSelect: onSelect = (option) => {
      const _option = option as ISelectOption;
      onChange(_option.value);
    };

    return (
      <EmotionCacheProvider>
        <div className={clsx(className, 'relative')}>
          <InputLabel required={required}>{label}</InputLabel>
          <Select
            value={
              value
                ? selectOptions.find((option) => option.value === value)
                : undefined
            }
            classNames={classNames}
            onChange={handleSelect}
            options={selectOptions}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      </EmotionCacheProvider>
    );
  },
);
