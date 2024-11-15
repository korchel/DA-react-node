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
import { USER_ROLES } from '../../../constants';
import { IEditUserForm, userUpdateSchema } from './userUpdateSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { normalizeI18nString } from '../../../utils/normalizeI18nString';

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
    lastname: user?.lastname,
    role: user?.role,
  };

  const roles = [
    { label: t('users.roles.ROLE_ADMIN'), value: USER_ROLES.ADMIN },
    { label: t('users.roles.ROLE_USER'), value: USER_ROLES.USER },
    { label: t('users.roles.ROLE_MODERATOR'), value: USER_ROLES.MODER },
  ];

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isDirty },
  } = useForm<IEditUserForm>({
    defaultValues,
    resolver: zodResolver(userUpdateSchema),
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
        error={t(normalizeI18nString(errors.username?.message))}
        {...register('username')}
      />
      <InputField
        label={t('users.modal.form.labels.email')}
        error={t(normalizeI18nString(errors.email?.message))}
        {...register('email')}
      />
      <InputField
        label={t('users.modal.form.labels.name')}
        error={t(normalizeI18nString(errors.name?.message))}
        {...register('name')}
      />
      <InputField
        label={t('users.modal.form.labels.lastname')}
        error={t(normalizeI18nString(errors.lastname?.message))}
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
      <ButtonComponent disabled={!isDirty} type='submit' variant='primary'>
        {t('users.modal.edit.button')}
      </ButtonComponent>
    </form>
  );
};
