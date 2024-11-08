import { useState } from "react";
import { ITableData } from "../interfaces";

export const useFilteredTable = (rows: ITableData[], fields: string[]): [ITableData[], (filterValue: string) => void] => {
  const [filteredTable, setFilteredTable] = useState(rows);

  const filterTable = (filterValue: string) => {
    
    if (filterValue) {
      const filteredRows = rows.filter((row) => {
      if (row.data) {
        return fields.some(field => {
          if (row.data[field]) {
            return (row.data[field] as string).toLowerCase().includes(filterValue);
          }
        })
        }
      return false;
      })
      setFilteredTable(filteredRows);
    } else {
      setFilteredTable(rows);
    }
  };
  
  return [filteredTable, filterTable];
};