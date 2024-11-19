/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash.isequal';
import { toast } from 'react-toastify';

import { closeModal, getCurrentDataId } from '../../../store/modalSlice';
import {
  MultiSelectComponent,
  CheckBox,
  ButtonComponent,
  Title,
} from '../../ui';
import {
  useEditFileMutation,
  useGetFileQuery as getFile,
} from '../../../store/filesApi';
import { routes } from '../../../routes';
import { useGetUsersQuery as getUsers } from '../../../store/usersApi';
import { getAvailableForOptions } from '../getAvailableForOptions';
import { useAuth } from '../../../context/AuthContext';

export interface IEditFileForm {
  available_for: number[];
  public_file: boolean;
  type_id?: any;
}

export const EditFile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);
  const { currentUser } = useAuth();

  const { data: users } = getUsers();
  const { data: file } = getFile(id);
  const [editFile] = useEditFileMutation();

  const defaultValues = {
    available_for: file?.available_for.map((user) => user.id),
    public_file: file?.public_file,
    type_id: null,
  };

  const { control, handleSubmit, setValue, watch } = useForm<IEditFileForm>({
    defaultValues,
  });
  const availableForOptions = getAvailableForOptions(users, currentUser);

  const onSubmit = (data: IEditFileForm) => {
    if (isEqual(data, defaultValues)) {
      dispatch(closeModal());
    } else {
      editFile({ data: { ...data, type_id: null }, id })
        .unwrap()
        .then(() => {
          toast.success(t('files.modal.edit.toast.success'));
        })
        .catch(() => {
          toast.error(t('files.modal.edit.toast.error'));
        });
      dispatch(closeModal());
      navigate(routes.filesRoute());
    }
  };

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('files.modal.title.edit')}</Title>
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            label={t('files.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={availableForOptions}
            placeholder={t('files.modal.form.placeholders.availableFor')}
            required={false}
            disabled={watch('public_file')}
          />
        )}
      />
      <div className='flex flex-col gap-5 md:flex-row justify-between items-center'>
        <Controller
          control={control}
          name='public_file'
          render={({ field }) => (
            <CheckBox
              {...field}
              checked={!!field.value}
              label={t('files.modal.form.labels.publicFile')}
              onChange={(e) => setValue('public_file', e.target.checked)}
              disabled={watch('available_for')?.length !== 0}
            />
          )}
        />
        <ButtonComponent type='submit' variant='primary'>
          {t('files.modal.edit.button')}
        </ButtonComponent>
      </div>
    </form>
  );
};
