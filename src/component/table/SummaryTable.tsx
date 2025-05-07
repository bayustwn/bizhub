import DataTable, { TableColumn } from "react-data-table-component";
import { Tugas } from "../../models/task/task";

interface Data {
  data: Tugas[];
}

const columns: TableColumn<Tugas>[] = [
  {
    name: "Judul",
    selector: (row) => `${row.kuantitas} ${row.judul}`,
  },
  {
    name: "Tenggat",
    selector: (row) => row.deadline,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => {
      switch (row.status) {
        case "Selesai":
          return <div className="px-5 font-medium py-1  rounded-md w-25 text-center text-white bg-green">
            <p>Selesai</p>
          </div>;
        
        case "Terlambat":
          return <div className="px-5 font-medium py-1  rounded-md w-25 text-center text-white bg-red">
            <p>Selesai</p>
          </div>;

        case "Revisi":
          return <div className="px-5 py-1 font-medium rounded-md w-25 text-center  bg-yellow text-black">
            <p>Revisi</p>
          </div>;
      }
    },
  },
];

function SummaryTable({ data }: Data) {
  return <DataTable columns={columns} data={data} />;
}

export default SummaryTable;
