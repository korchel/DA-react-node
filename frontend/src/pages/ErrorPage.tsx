import { useTranslation } from 'react-i18next';
import { Title } from '../components/ui';

export const ErrorPage = () => {
  const { t } = useTranslation();
  return (
    <div
      className='h-screen flex flex-col items-center justify-center
      bg-primary dark:bg-primaryDark'
    >
      <Title>{t('error.error')}</Title>
      <a
        href='/'
        className='block transition-colors underline
          text-secondary hover:text-secondaryHover
          dark:text-whiteDark dark:hover:text-highlightDark'
      >
        {t('error.toTheMain')}
      </a>
    </div>
  );
};
