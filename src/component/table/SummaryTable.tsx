import DataTable, {
  createTheme,
  TableColumn,
} from "react-data-table-component";
import { Tugas } from "../../models/task/task";
import { formatDate } from "../../utils/DateFormat";

interface Data {
  data: Tugas[];
  click?: (id: string) => void;
  column?: TableColumn<any>[];
}

createTheme("tables", {
  divider: {
    default: "#FFFFFF",
  },
});

const columns: TableColumn<Tugas>[] = [
  {
    name: "Judul",
    selector: (row) => `${row.kuantitas} ${row.judul}`,
    cell: (row) => {
      return (
        <p className={row.terlambat ? `text-red font-bold` : `text-black`}>
          {row.judul}
        </p>
      );
    },
  },
  {
    name: "Tenggat",
    selector: (row) => formatDate(row.deadline),
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => {
      switch (row.status) {
        case "Dibuat":
          return (
            <div className="px-5 font-medium py-1 rounded-md w-28 text-center text-primary bg-primary-200">
              <p>Dibuat</p>
            </div>
          );
        case "Dikerjakan":
          return (
            <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-primary">
              <p>Dikerjakan</p>
            </div>
          );

        case "Selesai":
          return (
            <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-green">
              <p>Selesai</p>
            </div>
          );

        case "Revisi":
          return (
            <div className="px-5 py-1 font-medium rounded-md w-28 text-center bg-yellow text-black">
              <p>Revisi</p>
            </div>
          );
        case "Ditinjau":
          return (
            <div className="px-5 py-1 font-medium rounded-md w-28 text-center bg-yellow text-black">
              <p>Ditinjau</p>
            </div>
          );
      }
    },
  },
];

function SummaryTable({ data, click, column }: Data) {
  return (
    <DataTable
      pointerOnHover
      onRowClicked={(row) => (click ? click(row.id) : {})}
      theme="tables"
      highlightOnHover
      columns={column ? column : columns}
      data={data}
    />
  );
}

export default SummaryTable;
