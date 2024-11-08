import { useTranslation } from 'react-i18next';

import { Title } from '../../components/ui';

export const SearchPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Title>{t('pageDummy')}</Title>
    </>
  );
};
