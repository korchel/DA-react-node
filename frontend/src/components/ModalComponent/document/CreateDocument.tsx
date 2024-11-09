import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import {
  InputField,
  TextArea,
  SelectComponent,
  CheckBox,
  ButtonComponent,
  MultiSelectComponent,
  Title,
} from '../../ui';
import { useCreateDocMutation } from '../../../store/docsApi';
import { useGetUsersQuery as getUsers } from '../../../store/usersApi';
import { routes } from '../../../routes';
import { closeModal } from '../../../store/modalSlice';
import { createDocFormSchema, IDocForm } from './docFormSchema';
import { useEffect } from 'react';
import { DOCUMENT_TYPES } from '../../../constants';
import { IDocTypeSelectOption } from './docFormSchema';

export const CreateDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectTypeOptions: IDocTypeSelectOption[] = [
    { value: DOCUMENT_TYPES.NOTE, label: t('documents.type.NOTE') },
    { value: DOCUMENT_TYPES.REPORT, label: t('documents.type.REPORT') },
    { value: DOCUMENT_TYPES.PRESENTATION, label: t('documents.type.PRESENTATION') },
    { value: DOCUMENT_TYPES.ARTICLE, label: t('documents.type.ARTICLE') },
  ];

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    setFocus,
  } = useForm<IDocForm>({
    defaultValues: { public_document: false, available_for: [] },
    resolver: zodResolver(createDocFormSchema),
  });

  const [createDoc] = useCreateDocMutation();
  const { data: users } = getUsers();
  const options = users?.map((user) => ({
    label: user.name,
    value: user.id,
  })) ?? [{ label: '', value: 0 }];

  const onSubmit = (data: IDocForm) => {
    createDoc(data)
      .unwrap()
      .then(() => {
        toast.success(t('documents.modal.create.toast.success'));
      })
      .catch(() => {
        toast.error(t('documents.modal.create.toast.error'));
      });
    dispatch(closeModal());
    navigate(routes.documentsRoute());
  };

  useEffect(() => {
    setFocus('title');
  }, [setFocus]);

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('documents.modal.title.create')}</Title>
      <InputField
        {...register('title')}
        label={t('documents.modal.form.labels.title')}
        error={errors.title}
      />
      <InputField
        {...register('number')}
        label={t('documents.modal.form.labels.number')}
        placeholder={t('documents.modal.form.placeholders.number')}
        error={errors.number}
        type='number'
      />
      <TextArea
        {...register('content')}
        label={t('documents.modal.form.labels.content')}
        error={errors.content}
      />
      <Controller
        control={control}
        name='type'
        render={({ field }) => (
          <SelectComponent
            {...field}
            placeholder={t('documents.modal.form.placeholders.type')}
            error={errors.type}
            label={t('documents.modal.form.labels.type')}
            onChange={field.onChange}
            selectOptions={selectTypeOptions}
          />
        )}
      />
      <Controller
        control={control}
        name='available_for'
        render={({ field }) => (
          <MultiSelectComponent
            {...field}
            error={errors.available_for}
            placeholder={t('documents.modal.form.placeholders.availableFor')}
            label={t('documents.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={options}
            required={false}
          />
        )}
      />
      <div className='flex flex-col gap-5 md:flex-row justify-between items-center'>
        <CheckBox
          label={t('documents.modal.form.labels.publicDocument')}
          {...register('public_document')}
          onChange={(e) => setValue('public_document', e.target.checked)}
        />
        <ButtonComponent type='submit' variant='primary'>
          {t('documents.modal.create.button')}
        </ButtonComponent>
      </div>
    </form>
  );
};
