/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';

import { useGetUsersQuery as getUsers } from '../../../store/usersApi';
import {
  CheckBox,
  FileInput,
  ButtonComponent,
  MultiSelectComponent,
  Title,
} from '../../ui';
import { useUploadFileMutation } from '../../../store/filesApi';
import { closeModal } from '../../../store/modalSlice';
import { routes } from '../../../routes';
import { fileUploadSchema, IFileForm } from './fileUploadSchema';
import { normalizeI18nString } from '../../../utils/normalizeI18nString';

const defaultValues = {
  params: {
    available_for: [],
    public_file: false,
  },
};

export const UploadFile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: users } = getUsers();
  const [uploadFile] = useUploadFileMutation();
  const availableForOptions = users?.map((user) => ({
    label: user.name,
    value: user.id,
  })) ?? [{ label: '', value: 0 }];
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IFileForm>({
    defaultValues,
    resolver: zodResolver(fileUploadSchema),
  });

  const onSubmit = (data: IFileForm) => {
    const fomrData = new FormData();
    fomrData.append('params', JSON.stringify(data.params));
    fomrData.append('file', data.file);
    uploadFile(fomrData)
      .unwrap()
      .then(() => {
        toast.success(t('files.modal.upload.toast.success'));
      })
      .catch((error) => {
        console.log(error);
        toast.error(t('files.modal.upload.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.filesRoute());
  };

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('files.modal.title.create')}</Title>
      <Controller
        control={control}
        name='file'
        render={({ field }) => (
          <FileInput
            {...field}
            value={''}
            onChange={field.onChange}
            label={t('files.modal.form.labels.addFile')}
            error={t(normalizeI18nString(errors.file?.message))}
          />
        )}
      />
      <Controller
        control={control}
        name='params.available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            error={errors.params?.available_for}
            label={t('files.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={availableForOptions}
            placeholder={t('files.modal.form.placeholders.availableFor')}
            required={false}
          />
        )}
      />
      <div className='flex flex-col gap-5 md:flex-row justify-between items-center'>
        <Controller
          control={control}
          name='params.public_file'
          render={({ field }) => (
            <CheckBox
              {...field}
              checked={!!field.value}
              label='Сделать документ публичным'
              onChange={(e) => setValue('params.public_file', e.target.checked)}
            />
          )}
        />
        <ButtonComponent type='submit' variant='primary'>
          Загрузить файл
        </ButtonComponent>
      </div>
    </form>
  );
};
