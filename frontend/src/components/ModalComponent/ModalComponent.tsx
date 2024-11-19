import { useDispatch, useSelector } from 'react-redux';

import { closeModal, getModalOpen, getModalType } from '../../store/modalSlice';
import { CreateDocument } from './document/CreateDocument';
import { EditDocument } from './document/EditDocument';
import { EditUser } from './user/EditUser';
import { EditFile } from './file/EditFile';
import { UploadFile } from './file/UploadFile';
import { ActionButton } from '../ui';
import { Delete } from './Delete';
import { useEffect } from 'react';

export const ModalComponent = () => {
  const dispatch = useDispatch();

  const modalType = useSelector(getModalType);
  const open = useSelector(getModalOpen);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const closeOnEscapePressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', closeOnEscapePressed);
    return () => window.removeEventListener('keydown', closeOnEscapePressed);
  }, []);

  return (
    open && (
      <div
        className='h-screen z-10 fixed inset-0 bg-slate-900/60 backdrop-blur overflow-y-auto
        flex flex-col items-center justify-center'
      >
        <div
          data-id='modal'
          className='relative rounded-lg h-fit
        flex flex-col
        md:min-w-[500px] 
        p-4 sm:p-6 md:p-8 
        bg-white dark:bg-secondaryDark'
        >
          {modalType === 'createDocument' && <CreateDocument />}
          {modalType === 'editDocument' && <EditDocument />}
          {modalType === 'editUser' && <EditUser />}
          {modalType === 'editFile' && <EditFile />}
          {modalType === 'uploadFile' && <UploadFile />}
          {modalType === 'deleteFile' && <Delete type='file' />}
          {modalType === 'deleteDocument' && <Delete type='doc' />}
          {modalType === 'deleteUser' && <Delete type='user' />}
          <ActionButton
            actionType='close'
            className='absolute text-white top-0 left-[100%] mx-2'
            onClick={handleClose}
          />
        </div>
      </div>
    )
  );
};
