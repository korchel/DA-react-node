import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { routes } from '../../routes';
import { useGetUsersQuery as getUsers } from '../../store/usersApi';
import { Spinner } from '../../components/ui/icons';
import { Title } from '../../components/ui';
import { TableContainer } from '../../components/TableContainer';
import { convirtDate } from '../../utils/convirtDate';

export const UsersPage = () => {
  const { t, i18n } = useTranslation();
  const { data: users, isLoading } = getUsers();
  const navigate = useNavigate();

  const tableColumns = [
    {
      label: t('users.tableHeader.userName'),
      accessor: 'username',
      sortable: true,
    },
    {
      label: t('users.tableHeader.name'),
      accessor: 'name',
      sortable: true,
    },
    {
      label: t('users.tableHeader.lastName'),
      accessor: 'lastname',
      sortable: true,
    },
    {
      label: t('users.tableHeader.role'),
      accessor: 'roles',
      sortable: false,
    },
    {
      label: t('users.tableHeader.registration'),
      accessor: 'creationDate',
      sortable: true,
    },
  ];

  const tableData = users?.map((user) => {
    const { id, username, name, lastname, role, creation_date } = user;
    return {
      id,
      data: {
        username,
        name,
        lastname,
        role: t(`users.roles.${role}`),
        creationDate: convirtDate(creation_date, i18n.language),
      },
    };
  });

  const handleGoToDetailsPage = (id: number) => {
    navigate(routes.userDetailsRoute(id));
  };

  if (isLoading) {
    return <Spinner className='h-full' />;
  }

  return (
    <>
      <Title>{t('users.title')}</Title>
      <TableContainer
        tableColumns={tableColumns}
        tableData={tableData}
        handleGoToDetailsPage={handleGoToDetailsPage}
        type='users'
        className='mt-4'
      />
    </>
  );
};
