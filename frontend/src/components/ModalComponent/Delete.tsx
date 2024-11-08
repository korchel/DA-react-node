import { useDispatch, useSelector } from 'react-redux';
import { closeModal, getCurrentDataId } from '../../store/modalSlice';
import { toast } from 'react-toastify';
import { routes } from '../../routes';
import { ButtonComponent } from '../ui';
import { useDeleteUserMutation } from '../../store/usersApi';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDeleteDocMutation } from '../../store/docsApi';
import { useDeleteFileMutation } from '../../store/filesApi';

interface IDeleteProps {
  type: 'file' | 'user' | 'doc';
}

export const Delete = ({ type }: IDeleteProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const id = useSelector(getCurrentDataId);

  const [deleteUser] = useDeleteUserMutation();
  const [deleteDoc] = useDeleteDocMutation();
  const [deleteFile] = useDeleteFileMutation();

  const deleteFunction = {
    user: deleteUser,
    file: deleteFile,
    doc: deleteDoc,
  }[type];

  const question = {
    user: t('users.modal.delete.areYouSure'),
    file: t('files.modal.delete.areYouSure'),
    doc: t('documents.modal.delete.areYouSure'),
  }[type];

  const toasts = {
    user: {
      success: t('users.modal.delete.toast.success'),
      error: t('users.modal.delete.toast.error'),
    },
    file: {
      success: t('files.modal.delete.toast.success'),
      error: t('files.modal.delete.toast.error'),
    },
    doc: {
      success: t('documents.modal.delete.toast.success'),
      error: t('documents.modal.delete.toast.error'),
    },
  }[type];

  const route = {
    user: routes.usersRoute(),
    file: routes.filesRoute(),
    doc: routes.documentsRoute(),
  }[type];

  const handleClose = () => {
    dispatch(closeModal());
  };

  const handleDelete = () => {
    deleteFunction(id)
      .unwrap()
      .then(() => {
        toast.success(toasts.success);
      })
      .catch(() => {
        toast.error(toasts.error);
      });
    dispatch(closeModal());
    navigate(route);
  };
  return (
    <>
      <div className='mb-4 font-bold text-center'>{question}</div>
      <div className='flex justify-between gap-4'>
        <ButtonComponent variant='outline' onClick={handleClose}>
          {t('cancel')}
        </ButtonComponent>
        <ButtonComponent variant='danger' onClick={handleDelete}>
          {t('delete')}
        </ButtonComponent>
      </div>
    </>
  );
};
