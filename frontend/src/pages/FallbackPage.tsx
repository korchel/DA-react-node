import { Spinner } from '../components/ui/icons';

const FallbackPage = () => (
  <div
    className='h-screen flex flex-col items-center justify-center
      bg-primary dark:bg-primaryDark'
  >
    <Spinner />
  </div>
);

export default FallbackPage;
