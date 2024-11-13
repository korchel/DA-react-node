import clsx from 'clsx';
import {
  DetailedHTMLProps,
  SetStateAction,
  TableHTMLAttributes,
  useEffect,
  useState,
} from 'react';
import chunk from 'lodash/chunk';
import Highlighter from 'react-highlight-words';
import { useTranslation } from 'react-i18next';
import { Entity, ITableColumn, ITableData } from '../../interfaces';
import { SortArrow } from '../ui/icons';
import { useFilteredTable, useSortableTable } from '../../hooks';
import { PageSizeSwitcher } from './PageSizeSwitcher';
import { Pagination } from '../ui/Pagination';
import { ActionButton, ButtonComponent, InputField } from '../ui';
import { QuantityTag } from './QuantityTag';

interface ITableProps
  extends DetailedHTMLProps<
    TableHTMLAttributes<HTMLTableElement>,
    HTMLTableElement
  > {
  tableColumns: ITableColumn[];
  tableData: ITableData[] | undefined;
  handleGoToDetailsPage: (id: number) => void;
  type: Entity;
  handleCreate?: () => void;
}

export const TableContainer = ({
  tableColumns,
  tableData,
  handleGoToDetailsPage,
  className,
  type,
  handleCreate,
}: ITableProps) => {
  const { t } = useTranslation();

  const filterFields = {
    documents: ['author', 'name'],
    files: ['author', 'name'],
    users: ['username', 'name', 'lastname'],
  };
  const [searchValue, setSearchValue] = useState('');
  const [filteredTable, filterTable] = useFilteredTable(
    tableData ?? [],
    filterFields[type],
  );

  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortedData, sortTable] = useSortableTable(filteredTable);

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    filterTable(event.target.value);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const pages = chunk(sortField ? sortedData : filteredTable, pageSize);
  const numberOfPages = pages.length || 1;
  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    sortTable(sortField, sortOrder);
  }, [filteredTable]);

  useEffect(() => {
    filterTable(searchValue);
  }, [tableData]);

  const handleSort = (accessor) => {
    const newSortOrder =
      accessor === sortField && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortOrder(newSortOrder as SetStateAction<'asc' | 'desc'>);
    sortTable(accessor, newSortOrder);
  };

  const isEmpty = !(tableData && tableData.length > 0);

  return (
    <div
      className={clsx(className, 'flex flex-col gap-2 md:gap-4 h-full min-h-0')}
    >
      <div className='flex gap-2 flex-wrap bg-white dark:bg-secondaryDark p-2 md:p-4 rounded-md'>
        <QuantityTag type={type} number={filteredTable.length} />
        <PageSizeSwitcher
          onChange={setPageSize}
          value={pageSize}
          className='justify-self-start'
        />
        <InputField
          actionButton={
            <ActionButton
              actionType='search'
              className='absolute top-2 right-3'
            />
          }
          placeholder={t(`${type}.searchPlaceholder`)}
          className='max-w-96 min-w-60 md:ml-auto flex-1'
          onChange={handleFilter}
        />
        {!(type === 'users') && (
          <ButtonComponent variant='primary' onClick={handleCreate}>
            {t(`${type}.create`)}
          </ButtonComponent>
        )}
      </div>

      <div className='overflow-hidden md:overflow-y-auto shrink min-h-0 rounded-md'>
        <Table>
          <THead>
            <THead.Tr>
              {tableColumns.map((tableColumn) => (
                <Th
                  key={tableColumn.accessor}
                  onClick={
                    tableColumn.sortable
                      ? () => handleSort(tableColumn.accessor)
                      : undefined
                  }
                  className={tableColumn.sortable && 'cursor-pointer'}
                >
                  <div className='flex it'>
                    <div className='truncate'>{tableColumn.label}</div>
                    {tableColumn.sortable && (
                      <SortArrow
                        className={clsx(
                          sortOrder === 'asc' &&
                            tableColumn.accessor === sortField &&
                            'rotate-180',
                          'block w-4 sm:w-5 md:w-6',
                        )}
                        active={tableColumn.accessor === sortField}
                      />
                    )}
                  </div>
                </Th>
              ))}
            </THead.Tr>
          </THead>
          <TBody>
            {isEmpty ? (
              <EmptyTableBody>{t('emptyTable')}</EmptyTableBody>
            ) : (
              pages[currentPage - 1]?.map((item) => (
                <TBody.Tr
                  key={item.id}
                  onClick={() => handleGoToDetailsPage(item.id)}
                >
                  {Object.entries(item.data).map(([key, param], index) => {
                    const string = (
                      param instanceof Date ? param.toLocaleDateString() : param
                    ) as string;

                    if (filterFields[type].includes(key)) {
                      return (
                        <Td key={index}>
                          <Highlighter
                            highlightClassName='bg-highlightDark dark:text-primaryDark'
                            searchWords={[searchValue]}
                            autoEscape={true}
                            textToHighlight={string}
                          />
                        </Td>
                      );
                    }
                    return (
                      <Td key={index}>
                        {param instanceof Date
                          ? param.toLocaleDateString()
                          : param}
                      </Td>
                    );
                  })}
                </TBody.Tr>
              ))
            )}
          </TBody>
        </Table>
      </div>
      <Pagination
        className='ml-auto mt-auto shrink-0'
        numberOfPages={numberOfPages}
        currentPage={currentPage}
        goToPage={handleChangePage}
      />
    </div>
  );
};

function Table({ children }) {
  return (
    <table
      className={clsx(
        'w-full bg-white dark:bg-secondaryDark text-left rounded-md shadow-md table-fixed',
      )}
    >
      {children}
    </table>
  );
}

function THead({ children }) {
  return (
    <thead
      className='block xl:table-header-group float-left xl:float-none uppercase
      text-secondary dark:text-whiteDark whitespace-nowrap
      md:sticky md:top-0 bg-inherit'
    >
      {children}
    </thead>
  );
}

THead.Tr = ({ children }) => {
  return (
    <tr className='border-r xl:border-r-0 border-b-0 xl:border-b border-gray overflow-hidden'>
      {children}
    </tr>
  );
};

function Th({ onClick, children, className }) {
  return (
    <th
      onClick={onClick}
      className={clsx(
        className,
        'flex xl:table-cell py-1 sm:py-2 md:py-4 px-1 sm:px-2 md:px-5 ',
      )}
    >
      {children}
    </th>
  );
}

function TBody({ children }) {
  return (
    <tbody className='block xl:table-row-group overflow-x-auto'>
      {children}
    </tbody>
  );
}
TBody.Tr = ({ onClick, children }) => {
  return (
    <tr
      className='table-cell xl:table-row overflow-hidden cursor-pointer
        border-gray border-r last:border-r-0 xl:border-r-0 xl:border-b xl:last:border-b-0
        hover:bg-whiteHover dark:hover:bg-secondaryDarkHover'
      onClick={onClick}
    >
      {children}
    </tr>
  );
};

function EmptyTableBody({ children }) {
  return (
    <tr className='text-secondary dark:text-whiteDark font-bold xl:h-44 block mt-10 xl:table-row'>
      <td colSpan={7} className='text-center block xl:table-cell'>
        {children}
      </td>
    </tr>
  );
}

function Td({ children }) {
  return (
    <td
      className='block max-w-48 xl:table-cell truncate
          h-6 sm:h-9 md:h-14
          py-1 sm:py-2 md:py-4
          px-1 sm:px-2 md:px-5'
    >
      {children}
    </td>
  );
}
