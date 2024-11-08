import clsx from 'clsx';
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  ForwardedRef,
  forwardRef,
  ReactNode,
} from 'react';

import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  CrossedEyeIcon,
  CloseIcon,
  DownloadIcon,
  OverviewIcon,
  MenuIcon,
  SearchIcon,
  ChevronSingle,
  ChevronDouble,
} from './icons';

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  actionType:
    | 'delete'
    | 'edit'
    | 'showPassword'
    | 'hidePassword'
    | 'close'
    | 'download'
    | 'overview'
    | 'openMenu'
    | 'search'
    | 'chevronSingle'
    | 'chevronDouble'
    | 'character';
  mirrored?: boolean;
  children?: ReactNode;
}

export const ActionButton = forwardRef(
  (
    {
      actionType,
      className,
      mirrored = false,
      children,
      ...props
    }: ButtonProps,
    ref: ForwardedRef<HTMLButtonElement>,
  ) => {
    const Icon = {
      chevronSingle: <ChevronSingle />,
      chevronDouble: <ChevronDouble />,
      character: children,
      delete: <DeleteIcon />,
      edit: <EditIcon />,
      showPassword: <EyeIcon />,
      hidePassword: <CrossedEyeIcon />,
      close: <CloseIcon />,
      download: <DownloadIcon />,
      overview: <OverviewIcon />,
      openMenu: <MenuIcon />,
      search: <SearchIcon />,
    }[actionType];

    return (
      <button
        type='button'
        {...props}
        className={clsx(
          className,
          mirrored && 'rotate-180',
          'text-secondary hover:text-secondaryHover dark:text-whiteDark dark:hover:text-whiteDarkHover font-bold transition-colors',
          'text-xs sm:text-sm md:text-md',
        )}
        ref={ref}
      >
        {Icon}
      </button>
    );
  },
);
