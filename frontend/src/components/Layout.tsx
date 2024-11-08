import { ToastContainer } from 'react-toastify';
import { Header } from './Header';
import { ModalComponent } from './ModalComponent/ModalComponent';
import { useTheme } from '../context/ThemeContext';

export const Layout = ({ children }) => {
  const { theme } = useTheme();

  return (
    <div
      className='h-screen
      text-xs sm:text-sm md:text-base
      text-black dark:text-whiteDark
      font-sans overflow-y-scroll
      bg-primary dark:bg-primaryDark'
    >
      <Header className='h-12 sm:h-16 md:h-24 sticky top-0 px-2 sm:px-5 md:px-8 peer' />
      <main className='h-[calc(100%-48px)] sm:h-[calc(100%-64px)] md:h-[calc(100%-96px)] pb-'>
        <div className='h-full p-2 sm:p-5 md:p-8 flex flex-col items-center'>
          {children}
        </div>
        <ModalComponent />
        <ToastContainer theme={theme} />
      </main>
    </div>
  );
};
