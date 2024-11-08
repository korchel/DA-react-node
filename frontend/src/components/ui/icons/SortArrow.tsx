import clsx from 'clsx';

export const SortArrow = ({
  className,
  active = true,
}: {
  className?: string;
  active?: boolean;
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      width='100%'
      height='100%'
      fill='currentColor'
      preserveAspectRatio='xMidYMin'
      className={className}
    >
      <g transform='translate(0, -5.25)'>
        <path
          className={clsx(active && 'text-highlight')}
          d='M6.414,15.586H17.586a1,1,0,0,0,.707-1.707L12.707,8.293a1,1,0,0,0-1.414,0L5.707,13.879A1,1,0,0,0,6.414,15.586Z'
        />
      </g>
      <g transform='translate(0, 4.75)'>
        <path d='M6.41,9H17.59a1,1,0,0,1,.7,1.71l-5.58,5.58a1,1,0,0,1-1.42,0L5.71,10.71A1,1,0,0,1,6.41,9Z' />
      </g>
    </svg>
  );
};
