import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
  InputField,
  SelectComponent,
  MultiSelectComponent,
  TextArea,
  CheckBox,
  ButtonComponent,
  Title,
} from '../../ui';
import isEqual from 'lodash.isequal';
import {
  useEditDocMutation,
  useGetDocQuery as getDoc,
} from '../../../store/docsApi';
import { useGetUsersQuery as getUsers } from '../../../store/usersApi';
import { routes } from '../../../routes';
import { closeModal, getCurrentDataId } from '../../../store/modalSlice';
import { editDocFormSchema, IDocForm } from './docFormSchema';
import { ISelectOption } from '../../../interfaces';

export const EditDocument = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = useSelector(getCurrentDataId);

  const { data: users } = getUsers();
  const { data: doc } = getDoc(id);
  const [editDoc] = useEditDocMutation();

  const selectTypeOptions: ISelectOption[] = [
    { value: 1, label: t('documents.type.NOTE') },
    { value: 2, label: t('documents.type.REPORT') },
    { value: 3, label: t('documents.type.PRESENTATION') },
    { value: 4, label: t('documents.type.ARTICLE') },
  ];

  const defaultValues = {
    title: doc?.title,
    number: doc?.number,
    content: doc?.content,
    author: doc?.author,
    type_id: doc?.type.id,
    available_for: doc?.available_for,
    public_document: !!doc?.public_document,
  };

  const availableForOptions = users?.map((user) => ({
    label: user.name,
    value: user.id,
  })) ?? [{ label: '', value: 0 }];
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IDocForm>({
    defaultValues,
    resolver: zodResolver(editDocFormSchema),
  });

  const onSubmit = (data: IDocForm) => {
    if (isEqual(data, defaultValues)) {
      dispatch(closeModal());
    } else {
      editDoc({ data, id })
        .unwrap()
        .then(() => {
          toast.success(t('documents.modal.edit.toast.success'));
        })
        .catch(() => {
          toast.error(t('documents.modal.edit.toast.error'));
        });
      dispatch(closeModal());
      navigate(routes.documentsRoute());
    }
  };

  return (
    <form
      className='flex flex-col gap-3 sm:gap-5 md:gap-7'
      onSubmit={handleSubmit(onSubmit)}
    >
      <Title>{t('documents.modal.title.edit')}</Title>
      <InputField
        {...register('title')}
        label={t('documents.modal.form.labels.title')}
        error={errors.title}
      />
      <InputField
        {...register('number')}
        label={t('documents.modal.form.labels.number')}
        error={errors.number}
      />
      <TextArea
        {...register('content')}
        label={t('documents.modal.form.labels.content')}
        error={errors.content}
      />
      <Controller
        control={control}
        name='type_id'
        render={({ field }) => (
          <SelectComponent
            {...field}
            error={errors.type_id}
            placeholder={t('documents.modal.form.placeholders.type')}
            onChange={field.onChange}
            label={t('documents.modal.form.labels.type')}
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
            label={t('documents.modal.form.labels.availableFor')}
            onChange={field.onChange}
            selectOptions={availableForOptions}
            placeholder={t('documents.modal.form.placeholders.availableFor')}
            required={false}
          />
        )}
      />
      <div className='flex flex-col gap-5 md:flex-row justify-between items-center'>
        <Controller
          control={control}
          name='public_document'
          render={({ field }) => (
            <CheckBox
              {...field}
              checked={!!field.value}
              label={t('documents.modal.form.labels.publicDocument')}
              onChange={(e) => setValue('public_document', e.target.checked)}
            />
          )}
        />
        <ButtonComponent type='submit' variant='primary'>
          {t('documents.modal.edit.button')}
        </ButtonComponent>
      </div>
    </form>
  );
};
