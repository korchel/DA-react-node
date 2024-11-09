/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldError, Merge } from 'react-hook-form';
import Select from 'react-select';

import { InputLabel } from '../InputLabel';
import { ErrorMessage } from '../ErrorMessage';
import { EmotionCacheProvider } from './EmotionProvider';
import { ISelectOption, onSelect } from './../../../interfaces';
import { classNames } from './styles';
import { ForwardedRef, forwardRef } from 'react';

interface ISelectInputProps {
  onChange: (option: ISelectOption[]) => void;
  placeholder: string;
  selectOptions: ISelectOption[];
  error?: Merge<FieldError, (FieldError | undefined)[]>;
  value: (number | string)[] | undefined;
  label?: string;
  required?: boolean;
}

export const MultiSelectComponent = forwardRef(
  (
    {
      onChange,
      placeholder,
      selectOptions,
      label,
      error,
      value,
      required = true,
      ...props
    }: ISelectInputProps,
    ref: ForwardedRef<null>,
  ) => {
    const handleSelect: onSelect = (options) => {
      const _options = options as ISelectOption[];
      onChange(_options.map((option: any) => option.value));
    };

    return (
      <EmotionCacheProvider>
        <div className='relative'>
          <InputLabel required={required}>{label}</InputLabel>
          <Select
            onChange={handleSelect}
            options={selectOptions}
            placeholder={placeholder}
            isMulti
            value={selectOptions.filter((option) =>
              value?.includes(option.value),
            )}
            classNames={classNames}
            ref={ref}
            {...props}
          />
          {error && <ErrorMessage>{error.message}</ErrorMessage>}
        </div>
      </EmotionCacheProvider>
    );
  },
);
