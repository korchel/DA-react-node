import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ChangeEventHandler } from 'react';

import { InputField, CheckBox, ButtonComponent, Title } from '../../ui';
import {
  useEditUserMutation,
  useGetUserQuery as getUser,
} from '../../../store/usersApi';
import { closeModal, getCurrentDataId } from '../../../store/modalSlice';
import { routes } from '../../../routes';
import { useAuth } from '../../../context/AuthContext';
import { defineAbilityFor } from '../../../casl/ability';
import { Can } from '@casl/react';
import { RoleName } from '../../../interfaces';
import { USER_ROLES } from '../../../userRoles';

export interface IEditUserForm {
  username: string;
  email: string;
  name: string;
  lastname: string;
  role: RoleName;
}

const roles = [
  { label: 'Администратор', value: USER_ROLES.ADMIN },
  { label: 'Пользователь', value: USER_ROLES.USER },
  { label: 'Модератор', value: USER_ROLES.MODER },
];

export const EditUser = () => {
  const { t } = useTranslation();
  const { currentUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: user } = getUser(id);
  const [editUser] = useEditUserMutation();

  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
  });

  const defaultValues = {
    username: user?.username,
    email: user?.email,
    name: user?.name,
    lastName: user?.lastname,
    role: user?.role,
  };

  const { register, control, handleSubmit, setValue } = useForm<IEditUserForm>({
    defaultValues,
  });

  const onSubmit = (data: IEditUserForm) => {
    editUser({ data, id })
      .unwrap()
      .then(() => {
        toast.success(t('users.modal.edit.toast.success'));
      })
      .catch(() => {
        toast.error(t('users.modal.edit.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.userDetailsRoute(id));
  };

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setValue('role', value as RoleName);
    }
  };

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('users.modal.title.edit')}</Title>
      <InputField
        label={t('users.modal.form.labels.username')}
        {...register('username')}
      />
      <InputField
        label={t('users.modal.form.labels.email')}
        {...register('email')}
      />
      <InputField
        label={t('users.modal.form.labels.name')}
        {...register('name')}
      />
      <InputField
        label={t('users.modal.form.labels.lastname')}
        {...register('lastname')}
      />
      <Can I='edit' a='role' ability={ability}>
        <fieldset>
          {roles.map((role) => (
            <Controller
              key={role.value}
              control={control}
              name='role'
              render={({ field }) => (
                <CheckBox
                  {...field}
                  label={role.label}
                  checked={field.value === role.value}
                  value={role.value}
                  onChange={(e) => handleCheck(e)}
                />
              )}
            />
          ))}
        </fieldset>
      </Can>
      <ButtonComponent type='submit' variant='primary'>
        {t('users.modal.edit.button')}
      </ButtonComponent>
    </form>
  );
};
