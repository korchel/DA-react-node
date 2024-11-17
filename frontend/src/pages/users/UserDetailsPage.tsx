import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { ButtonComponent, Card } from '../../components/ui';
import { useGetUserQuery as getUser } from '../../store/usersApi';
import { Spinner } from '../../components/ui/icons';
import { openModal } from '../../store/modalSlice';
import { useAuth } from '../../context/AuthContext';
import { defineAbilityFor } from '../../casl/ability';
import { Can } from '@casl/react';
import { convirtDate } from '../../utils/convirtDate';

export const UserDetailsPage = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data: user, isLoading } = getUser(id);

  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
    entity: { author: user?.username },
  });

  const handleDelete = () => {
    dispatch(openModal({ type: 'deleteUser', open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: 'editUser', open: true, id }));
  };

  if (isLoading) {
    return <Spinner className='h-[100%]' />;
  }

  return (
    <Card>
      <Card.Header>
        {t('users.detailsPage.title') + ' '}
        <span className='text-highlight dark:text-highlightDark'>
          {user?.username}
        </span>
      </Card.Header>
      <Card.Body>
        <div>
          <span className='font-bold'>{t('users.detailsPage.name')}</span>
          {user?.name}
        </div>
        <div>
          <span className='font-bold'>{t('users.detailsPage.lastName')}</span>
          {user?.lastname}
        </div>
        <div>
          <span className='font-bold'>{t('users.detailsPage.email')}</span>
          {user?.email}
        </div>
        <div>
          <span className='font-bold'>{t('users.detailsPage.role') + ' '}</span>
          {user && t(`users.roles.${user.role}`)}
        </div>
        <div>
          <span className='font-bold'>{t('users.detailsPage.registration') + ' '}</span>
          {user && convirtDate(user.creation_date, i18n.language)}
        </div>
      </Card.Body>
      <Card.Footer>
        <Can I='edit' a='user' ability={ability}>
          <ButtonComponent variant='primary' onClick={handleEdit}>
            {t('users.detailsPage.edit')}
          </ButtonComponent>
        </Can>
        <Can I='delete' a='user' ability={ability}>
          <ButtonComponent variant='danger' onClick={handleDelete}>
            {t('users.detailsPage.delete')}
          </ButtonComponent>
        </Can>
      </Card.Footer>
    </Card>
  );
};
