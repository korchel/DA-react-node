import { useTranslation } from 'react-i18next';
import { Entity } from '../../interfaces';

interface INumberTagProps {
  number: number | undefined;
  type: Entity;
}

export const QuantityTag = ({ number, type }: INumberTagProps) => {
  const { t } = useTranslation();

  const info = {
    files: t('files.quantity.count', { count: number }),
    documents: t('documents.quantity.count', { count: number }),
    users: t('users.quantity.count', { count: number }),
  }[type];

  return (
    <div
      className='h-9 md:h-10 p-2 rounded-sm leading-none box-border flex items-center text-nowrap
      text-secondary dark:text-primaryDark
      bg-highlightDark dark:bg-highlight'
    >
      {info}
    </div>
  );
};
