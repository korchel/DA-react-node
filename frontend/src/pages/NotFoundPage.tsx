import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { ButtonComponent, Title } from '../components/ui';
import { routes } from '../routes';

export const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className='h-full flex flex-col items-center justify-center gap-3'>
      <Title>{t('notFoundPage.title')}</Title>
      <Link to={routes.documentsRoute()}>
        <ButtonComponent variant='primary'>
          {t('notFoundPage.button')}
        </ButtonComponent>
      </Link>
    </div>
  );
};
