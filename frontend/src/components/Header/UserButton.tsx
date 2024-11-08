import { useTranslation } from 'react-i18next';
import { useAuth } from '../../context/AuthContext';
import { DropDown } from '../ui';

export const UserButton = () => {
  const { logOut, currentUser } = useAuth();
  const { t } = useTranslation();

  const options = {
    logout: t('header.logout'),
  };

  const handleLogOut = () => {
    logOut();
  };

  return (
    <DropDown
      name={currentUser.username}
      options={options}
      action={handleLogOut}
    />
  );
};
