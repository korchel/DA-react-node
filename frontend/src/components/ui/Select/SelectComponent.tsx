import Select from 'react-select';

import { InputLabel } from '../InputLabel';
import { ErrorMessage } from '../ErrorMessage';
import { ISelectOption, onSelect } from './../../../interfaces';
import { EmotionCacheProvider } from './EmotionProvider';
import { getClassNames } from './styles';
import clsx from 'clsx';
import { ForwardedRef, forwardRef } from 'react';

interface ISelectInputProps {
  onChange: (option: string | number) => void;
  placeholder?: string;
  selectOptions: ISelectOption[];
  error?: string;
  value: string | number;
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
            classNames={getClassNames(!!error)}
            onChange={handleSelect}
            options={selectOptions}
            placeholder={placeholder}
            ref={ref}
            {...props}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </div>
      </EmotionCacheProvider>
    );
  },
);
