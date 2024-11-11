import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Can } from '@casl/react';

import { useGetFileQuery as getFile } from '../../store/filesApi';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { Card, ButtonComponent, ActionButton } from '../../components/ui';
import { routes } from '../../routes';
import { useAuth } from '../../context/AuthContext';
import { defineAbilityFor } from '../../casl/ability';
import { convirtDate } from '../../utils/convirtDate';

const FileDetailsPage = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data: file, isLoading } = getFile(id);

  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
    entity: { userName: file?.author },
  });

  const handleDelete = () => {
    dispatch(openModal({ type: 'deleteFile', open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: 'editFile', open: true, id }));
  };

  const handleDownload = (event, id) => {
    event.stopPropagation();
    fetch(routes.fileDownloadPath(id), { credentials: 'include' })
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        console.log(blob);
        a.href = url;
        a.download = file?.filename as string;
        a.click();
        URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleOverview = (event, id) => {
    event.stopPropagation();
    window.open(routes.fileDownloadPath(id), '_blank');
  };

  if (isLoading) {
    return <Spinner className='h-[100%]' />;
  }

  return (
    <Card>
      <Card.Header>
        {t('files.detailsPage.title') + ' '}
        <span className='text-highlight'>{file?.filename}</span>
      </Card.Header>
      <Card.Body className='flex justify-between gap-3 flex-wrap'>
        <div>
          <div>
            <span className='font-bold'>{t('files.detailsPage.name')}</span>
            {file?.filename}
          </div>
          <div>
            <span className='font-bold'>{t('files.detailsPage.type')}</span>
            {file?.filetype}
          </div>
          <div>
            <span className='font-bold'>{t('files.detailsPage.author')}</span>
            {file?.author}
          </div>
          <div>
            <span className='font-bold'>
              {t('files.detailsPage.creationDate')}
            </span>
            {file && convirtDate(file?.creation_date, i18n.language)}
          </div>
        </div>
        <div className='flex flex-col gap-4'>
          <div className='w-24 h-24 border-white dark:border-whiteDark border-2 rounded-sm'>
            <img
              src={routes.thumbnailPath(file?.id)}
              alt={file?.filename}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex justify-between'>
            <ActionButton
              actionType='download'
              title={t('download')}
              onClick={(event) => handleDownload(event, id)}
            />
            <ActionButton
              actionType='overview'
              title={t('see')}
              onClick={(event) => handleOverview(event, id)}
            />
          </div>
        </div>
      </Card.Body>
      <Card.Footer>
        <Can I='edit' a='file' ability={ability}>
          <ButtonComponent variant='primary' onClick={handleEdit}>
            {t('files.detailsPage.edit')}
          </ButtonComponent>
        </Can>
        <Can I='delete' a='file' ability={ability}>
          <ButtonComponent variant='danger' onClick={handleDelete}>
            {t('files.detailsPage.delete')}
          </ButtonComponent>
        </Can>
      </Card.Footer>
    </Card>
  );
};

export default FileDetailsPage;
