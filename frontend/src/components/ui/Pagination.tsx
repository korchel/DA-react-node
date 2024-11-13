import clsx from 'clsx';

import { ActionButton } from './ActionButton';
import { usePagination } from '../../hooks/usePagination';

interface IPaginationProps {
  numberOfPages: number;
  currentPage: number;
  goToPage: (page: number) => void;
  className?: string;
}

export const Pagination = ({
  numberOfPages,
  currentPage,
  goToPage,
  className,
}: IPaginationProps) => {
  const pageNumbers = usePagination({ numberOfPages, currentPage });

  const commonClassNames = 'sm:p-1 border-gray';
  const basicClassNames =
    'bg-white hover:bg-whiteHover dark:bg-secondaryDark dark:hover:bg-secondaryDarkHover';
  const activePageClassNames = `text-secondary hover:text-secondary dark:text-whiteDark dark:hover:text-whiteDark
    bg-whiteHover hover:bg-whiteHover dark:bg-secondaryDarkHover dark:hover:bg-secondaryDarkHover`;
  const inactiveButtonClassNames = `text-secondaryHover hover:text-secondaryHover
    dark:text-whiteDarkHover dark:hover:text-whiteDarkHover
    bg-white hover:bg-white dark:bg-secondaryDark dark:hover:bg-secondaryDark`;

  return (
    <div
      className={clsx(
        className,
        'flex rounded-md overflow-hidden shadow-md h-8',
      )}
    >
      <ActionButton
        actionType='chevronDouble'
        className={clsx(
          commonClassNames,
          currentPage === 1 ? inactiveButtonClassNames : basicClassNames,
          'border-l',
        )}
        mirrored
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
      />
      <ActionButton
        actionType='chevronSingle'
        className={clsx(
          commonClassNames,
          currentPage === 1 ? inactiveButtonClassNames : basicClassNames,
          'border-l',
        )}
        mirrored
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {pageNumbers.map((number) => (
        <ActionButton
          key={number}
          actionType='character'
          className={clsx(
            commonClassNames,
            number === currentPage ? activePageClassNames : basicClassNames,
            'border-r w-8',
          )}
          disabled={number === currentPage}
          onClick={() => goToPage(number)}
        >
          {number}
        </ActionButton>
      ))}
      <ActionButton
        actionType='chevronSingle'
        className={clsx(
          commonClassNames,
          currentPage === numberOfPages
            ? inactiveButtonClassNames
            : basicClassNames,
          'border-r',
        )}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === numberOfPages}
      />
      <ActionButton
        actionType='chevronDouble'
        className={clsx(
          commonClassNames,
          currentPage === numberOfPages
            ? inactiveButtonClassNames
            : basicClassNames,
        )}
        onClick={() => goToPage(numberOfPages)}
        disabled={currentPage === numberOfPages}
      />
    </div>
  );
};
