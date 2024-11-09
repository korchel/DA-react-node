import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Title } from '../../components/ui';
import { useGetFilesQuery as getFiles } from '../../store/filesApi';
import { routes } from '../../routes';
import { openModal } from '../../store/modalSlice';
import { TableContainer } from '../../components/TableContainer';
import { Spinner } from '../../components/ui/icons';
import { convirtDate } from '../../utils/convirtDate';

export const FilesPage = () => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: files, isLoading } = getFiles();

  const tableColumns = [
    {
      label: t('files.tableHeader.fileName'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('files.tableHeader.fileType'),
      accessor: 'type',
      sortable: false,
    },
    {
      label: t('files.tableHeader.author'),
      accessor: 'author',
      sortable: true,
    },
    {
      label: t('files.tableHeader.creationDate'),
      accessor: 'creationDate',
      sortable: true,
    },
    {
      label: t('files.tableHeader.updateDate'),
      accessor: 'updateDate',
      sortable: true,
    },
  ];

  const tableData = files?.map((file) => {
    const { id, filename, filetype, author, creation_date, update_date } = file;
    return {
      id: id,
      data: {
        name: filename,
        type: filetype,
        author: author,
        creation_date: convirtDate(creation_date, i18n.language),
        update_date: convirtDate(update_date, i18n.language),
      },
    };
  });

  const handleCreate = () => {
    dispatch(openModal({ type: 'uploadFile', open: true }));
  };

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.fileDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('files.title')}</Title>
      <TableContainer
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        type='files'
        handleCreate={handleCreate}
        className='mt-4'
      />
    </>
  );
};
