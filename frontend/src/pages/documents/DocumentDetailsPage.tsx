import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { useGetDocQuery as getDoc } from '../../store/docsApi';
import { Card, ButtonComponent } from '../../components/ui';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { useAuth } from '../../context/AuthContext';
import { defineAbilityFor } from '../../casl/ability';
import { Can } from '@casl/react';
import { convirtDate } from '../../utils/convirtDate';

const DocumentDetailsPage = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data: doc, isLoading } = getDoc(id);
  console.log(doc)
  const ability = defineAbilityFor({
    user: { ...currentUser, isAuthenticated },
    entity: { author: doc?.author },
  });

  const handleDelete = () => {
    dispatch(openModal({ type: 'deleteDocument', open: true, id }));
  };

  const handleEdit = () => {
    dispatch(openModal({ type: 'editDocument', open: true, id }));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <Card>
      <Card.Header>
        {t('documents.detailsPage.title') + ' '}
        <span className='text-highlight'>{doc?.title}</span>
      </Card.Header>
      <Card.Body className=''>
        <div>
          <span className='font-bold'>{t('documents.detailsPage.number')}</span>
          {doc?.number}
        </div>
        <div>
          <span className='font-bold'>{t('documents.detailsPage.author')}</span>
          {doc?.author}
        </div>
        <div>
          <span className='font-bold'>{t('documents.detailsPage.type')}</span>
          {doc && t(`documents.type.${doc.type}`)}
        </div>
        <div>
          <span className='font-bold'>{t('documents.detailsPage.public')}</span>
          {doc?.public_document ? t('yes') : t('no')}
        </div>
        <div className='font-bold'>{t('documents.detailsPage.content')}</div>
        <div className='overflow-y-auto h-72 my-2'>{doc?.content}</div>
        <div>
          <span className='font-bold'>
            {t('documents.detailsPage.creationDate')}
          </span>
          {convirtDate(doc?.creation_date, i18n.language)}
        </div>
        <div>
          <span className='font-bold'>
            {t('documents.detailsPage.updateDate')}
          </span>
          {convirtDate(doc?.update_date, i18n.language)}
        </div>
      </Card.Body>
      <Card.Footer>
        <Can I='edit' a='document' ability={ability}>
          <ButtonComponent variant='primary' onClick={handleEdit}>
            {t('documents.detailsPage.edit')}
          </ButtonComponent>
        </Can>
        <Can I='delete' a='document' ability={ability}>
          <ButtonComponent variant='danger' onClick={handleDelete}>
            {t('documents.detailsPage.delete')}
          </ButtonComponent>
        </Can>
      </Card.Footer>
    </Card>
  );
};

export default DocumentDetailsPage;
