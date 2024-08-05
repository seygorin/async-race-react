import { useMemo } from "react";
import { ColumnsType } from "antd/es/table";
import Button from "@components/common/Button";
import { ActionColumnType, WinnerColumnType, Winner } from "@type/winnersTypes";
import columnsData from "./tableColumns";

const useWinnersTableColumns = (
  handleDeleteWinner: (winner: Winner) => void,
): ColumnsType<Winner> => {
  return useMemo<ColumnsType<Winner>>(() => {
    return columnsData.map((column: WinnerColumnType | ActionColumnType) => {
      if (column.key === "action") {
        return {
          ...column,
          render: (_: unknown, record: Winner) => (
            <Button onClick={() => handleDeleteWinner(record)}>Delete</Button>
          ),
        };
      }
      return column;
    });
  }, [handleDeleteWinner]);
};

export default useWinnersTableColumns;
