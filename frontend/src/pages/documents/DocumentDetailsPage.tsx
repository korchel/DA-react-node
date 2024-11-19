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
import { normalizeI18nString } from '../../utils/normalizeI18nString';
import { Item } from '../../components/ui/Items';

const DocumentDetailsPage = () => {
  const { id } = useParams();
  const { currentUser, isAuthenticated } = useAuth();
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();

  const { data: doc, isLoading } = getDoc(id);
  console.log(doc?.available_for);
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
        {doc && (
          <>
            <Item
              title={t('documents.detailsPage.number')}
              content={doc.number}
            />
            <Item
              title={t('documents.detailsPage.available')}
              content={
                doc.available_for.length > 0
                  ? doc.available_for.map((user) => user.username).join(', ')
                  : t(
                      normalizeI18nString(
                        [
                          'documents.detailsPage.forNoone',
                          'documents.detailsPage.forEverybody',
                        ][+doc.public_document],
                      ),
                    )
              }
            />
            <Item
              title={t('documents.detailsPage.author')}
              content={doc.author}
            />
            <Item
              title={t('documents.detailsPage.type')}
              content={t(`documents.type.${doc.type}`)}
            />
            <div className='font-bold'>
              {t('documents.detailsPage.content')}
            </div>
            <div className='overflow-y-auto h-72 my-2'>{doc.content}</div>
            <Item
              title={t('documents.detailsPage.creationDate')}
              content={convirtDate(doc?.creation_date, i18n.language)}
            />
            <Item
              title={t('documents.detailsPage.updateDate')}
              content={convirtDate(doc?.update_date, i18n.language)}
            />
          </>
        )}
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
