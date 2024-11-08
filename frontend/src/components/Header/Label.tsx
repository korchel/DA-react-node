import { Link } from 'react-router-dom';

import { routes } from '../../routes';

export const Label = () => (
  <Link to={routes.documentsRoute()}>
    <div
      className='rounded-full flex items-center justify-center
      h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 
      font-bold text-xl sm:text-2xl md:text-4xl 
      bg-primary dark:bg-primaryDark
      text-secondary dark:text-highlightDark'
    >
      <span className='mb-1'>DA</span>
    </div>
  </Link>
);
