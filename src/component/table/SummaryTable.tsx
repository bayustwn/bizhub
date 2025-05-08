import DataTable, { createTheme, TableColumn } from "react-data-table-component";
import { Tugas } from "../../models/task/task";
import { formatDate } from "../../utils/DateFormat";

interface Data {
  data: Tugas[];
}

createTheme('tables',{
    divider :{
        default : '#FFFFFF'
    }
})

const columns: TableColumn<Tugas>[] = [
  {
    name: "Judul",
    selector: (row) => `${row.kuantitas} ${row.judul}`,
  },
  {
    name: "Tenggat",
    selector: (row) => formatDate(row.deadline)
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => {
      if (row.terlambat) {
        return <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-red">
                <p>Terlambat</p>
              </div>;
      }else{
        switch (row.status) {
            case "Dikerjakan":
              return <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-primary">
                <p>Dikerjakan</p>
              </div>;

            case "Selesai":
              return <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-green">
                <p>Selesai</p>
              </div>;
    
            case "Revisi":
              return <div className="px-5 py-1 font-medium rounded-md w-28 text-center  bg-yellow text-black">
                <p>Revisi</p>
              </div>;
          }
        }
      }
  },
];

function SummaryTable({ data }: Data) {
  return <DataTable theme="tables" highlightOnHover columns={columns} data={data} />;
}

export default SummaryTable;
