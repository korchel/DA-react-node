import { useMemo } from 'react';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

export const usePagination = ({
  numberOfPages,
  numberOfSiblings = 2,
  currentPage,
}) => {
  const paginationRange = useMemo(() => {
    const numberOfButtons = 2 * numberOfSiblings + 1;

    if (numberOfPages < numberOfButtons) {
      return range(1, numberOfPages);
    }

    const firstButton =
      numberOfPages - currentPage > numberOfSiblings
        ? Math.max(currentPage - numberOfSiblings, 1)
        : Math.min(
            currentPage - numberOfSiblings,
            numberOfPages - numberOfSiblings * 2,
          );
    const numberOfLeftButtons = Math.min(
      currentPage - firstButton,
      numberOfSiblings,
    );
    const numberOfRightButtons = numberOfSiblings * 2 - numberOfLeftButtons;
    const lastButton = Math.min(
      currentPage + numberOfRightButtons,
      numberOfPages,
    );

    return [
      ...range(firstButton, currentPage),
      ...range(currentPage + 1, lastButton),
    ];
  }, [numberOfPages, numberOfSiblings, currentPage]);

  return paginationRange;
};
