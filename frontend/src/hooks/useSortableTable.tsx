import { useState } from "react";
import { ITableData } from "../interfaces";

export const useSortableTable = (tableData: ITableData[] | undefined): [ITableData[] | undefined, (sortField: string, sortOrder: 'asc' | 'desc') => void] => {
  const [sortedData, setSortedData] = useState(tableData);

  const sortTable = (sortField, sortOrder) => {
    if (sortField && tableData) {
      const sorted = [...tableData].sort((a, b) => {
        if (!a['data'][sortField]) return 1;
        if (!b['data'][sortField]) return -1;
        if (a['data'][sortField] && b['data'][sortField]) {
          return (
            a.data[sortField].toString().localeCompare(b.data[sortField].toString(), ["en", 'ru'], {
            numeric: true,
            }) * (sortOrder === "asc" ? 1 : -1)
          );
        }
        return 0;
      });
      setSortedData(sorted);
    }
  };

  
  return [sortedData, sortTable];
};