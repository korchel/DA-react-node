import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Title } from '../../components/ui';
import { routes } from '../../routes';
import { useGetDocsQuery as getDocs } from '../../store/docsApi';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { TableContainer } from '../../components/TableContainer';

export const DocumentsPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: documents, isLoading } = getDocs();

  const tableColumns = [
    {
      label: t('documents.tableHeader.number'),
      accessor: 'number',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.name'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.author'),
      accessor: 'author',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.type'),
      accessor: 'type',
      sortable: false,
    },
    {
      label: t('documents.tableHeader.content'),
      accessor: 'content',
      sortable: false,
    },
    {
      label: t('documents.tableHeader.creationDate'),
      accessor: 'creationDate',
      sortable: true,
    },
    {
      label: t('documents.tableHeader.updateDate'),
      accessor: 'updateDate',
      sortable: true,
    },
  ];

  const tableData = documents?.map((document) => ({
    id: document.id,
    data: {
      number: document.number,
      name: document.title,
      author: document.author,
      type: t(`documents.type.${document.type.type}`),
      content: document.content,
      creationDate: document.creation_date
        ? new Date(document.creation_date)
        : t('documents.noData'),
      updateDate: document.update_date
        ? new Date(document.update_date)
        : t('documents.noData'),
    },
  }));

  const handleCreate = () => {
    dispatch(openModal({ type: 'createDocument', open: true }));
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.documentDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('documents.title')}</Title>
      <TableContainer
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        type='documents'
        handleCreate={handleCreate}
        className='mt-4'
      />
    </>
  );
};
