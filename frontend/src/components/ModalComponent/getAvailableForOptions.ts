import { USER_ROLES } from '../../constants';

export const getAvailableForOptions = (users, currentUser) => {
  const availableForOptions = users?.map((user) => ({
    label: user.username,
    value: user.id,
    isDisabled:
      user.role === USER_ROLES.ADMIN ||
      user.role === USER_ROLES.MODER ||
      user.id === currentUser.id,
  })) ?? [{ label: '', value: 0 }];
  return availableForOptions;
};
