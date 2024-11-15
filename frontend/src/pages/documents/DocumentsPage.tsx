import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { Title } from '../../components/ui';
import { routes } from '../../routes';
import { useGetDocsQuery as getDocs } from '../../store/docsApi';
import { openModal } from '../../store/modalSlice';
import { Spinner } from '../../components/ui/icons';
import { TableContainer } from '../../components/TableContainer';
import { convirtDate } from '../../utils/convirtDate';

export const DocumentsPage = () => {
  const { t, i18n } = useTranslation();
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

  const tableData = documents?.map((document) => {
    const {
      id,
      number,
      title,
      author,
      type,
      content,
      creation_date,
      update_date,
    } = document;
    return {
      id,
      data: {
        number: number,
        name: title,
        author: author,
        type: t(`documents.type.${type}`),
        content: content,
        creation_date: convirtDate(creation_date, i18n.language),
        update_date: convirtDate(update_date, i18n.language),
      },
    };
  });

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
