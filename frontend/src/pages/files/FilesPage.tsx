import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { Title } from '../../components/ui';
import { useGetFilesQuery as getFiles } from '../../store/filesApi';
import { routes } from '../../routes';
import { openModal } from '../../store/modalSlice';
import { TableContainer } from '../../components/TableContainer';
import { Spinner } from '../../components/ui/icons';

export const FilesPage = () => {
  const { t } = useTranslation();
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

  const tableData = files?.map((file) => ({
    id: file.id,
    data: {
      name: file.filename,
      type: file.filetype,
      author: file.author,
      creationDate: file.creation_date
        ? Date.parse(file.creation_date)
        : 'no data',
      updateDate: file.update_date ? Date.parse(file.update_date) : 'no data',
    },
  }));

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
