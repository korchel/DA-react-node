import clsx from 'clsx';
import { ClassNamesConfig, GroupBase } from 'react-select';
import { ISelectOption } from './../../../interfaces';

export const getClassNames = (
  isError: boolean,
):
  | ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>>
  | undefined => {
  const borderClassNames = isError
    ? 'border-danger  dark:border-errorDark'
    : 'border-secondary dark:border-whiteDark';
  return {
    control: (state) =>
      clsx(
        'bg-transparent',
        state.isFocused
          ? `ring ring-primary ring-opacity-50 border-secondary
          dark:ring-whiteDark dark:!ring-primaryDark`
          : borderClassNames,

        'hover:border-secondary dark:hover:border-whiteDark rounded-sm cursor-pointer',
      ),
    valueContainer: () => 'p-1',
    option: ({ isSelected, isFocused }) =>
      clsx(
        isFocused && !isSelected && '!bg-primary dark:!bg-secondaryDarkHover',
        isSelected && 'bg-secondary',
        'cursor-pointer',
      ),
    menu: () => 'z-20 dark:bg-secondaryDark',
    placeholder: () => 'text-secondary dark:text-whiteDark',
    singleValue: () => 'text-secondary dark:text-whiteDark',
    multiValue: () =>
      'text-secondary dark:text-whiteDark bg-primary dark:bg-primaryDark',
    multiValueLabel: () =>
      'text-secondary dark:text-whiteDark bg-primary dark:bg-primaryDark',
    clearIndicator: () => 'text-secondary dark:text-whiteDark',
    dropdownIndicator: () => 'text-secondary dark:text-whiteDark',
    indicatorSeparator: () => 'bg-secondary dark:bg-whiteDark',
  };
};

export const classNames:
  | ClassNamesConfig<ISelectOption, true, GroupBase<ISelectOption>>
  | undefined = {
  control: (state) =>
    clsx(
      'bg-transparent',
      state.isFocused
        ? `ring ring-primary ring-opacity-50 border-secondary
        dark:ring-whiteDark dark:!ring-primaryDark`
        : 'border-secondary dark:border-whiteDark',

      'hover:border-secondary dark:hover:border-whiteDark rounded-sm cursor-pointer',
    ),
  valueContainer: () => 'p-1',
  option: ({ isSelected, isFocused }) =>
    clsx(
      isFocused && !isSelected && '!bg-primary dark:!bg-secondaryDarkHover',
      isSelected && 'bg-secondary',
      'cursor-pointer',
    ),
  menu: () => 'z-20 dark:bg-secondaryDark',
  placeholder: () => 'text-secondary dark:text-whiteDark',
  singleValue: () => 'text-secondary dark:text-whiteDark',
  multiValue: () =>
    'text-secondary dark:text-whiteDark bg-primary dark:bg-primaryDark',
  multiValueLabel: () =>
    'text-secondary dark:text-whiteDark bg-primary dark:bg-primaryDark',
  clearIndicator: () => 'text-secondary dark:text-whiteDark',
  dropdownIndicator: () => 'text-secondary dark:text-whiteDark',
  indicatorSeparator: () => 'bg-secondary dark:bg-whiteDark',
};
