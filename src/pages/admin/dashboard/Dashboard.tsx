import axios from "axios";
import Counter from "../../../component/card/Counter";
import More from "../../../component/card/More";
import Navbar from "../../../component/Navbar";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";
import { Mingguan, Tugas } from "../../../models/task/task";
import DataTable, {
  TableColumn,
} from "react-data-table-component";
import SummaryTable from "../../../component/table/SummaryTable";
import { filterRange } from "../../../utils/FilterTugas";
import { useNavigate } from "react-router";

function Dashboard() {
  const { getToken } = useToken();
  const navigate = useNavigate()
  const [tugas, setTugas] = useState<Tugas[]>();
  const [total, setTotal] = useState<Mingguan[]>();

  const getTugas = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/tugas", {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((res) => {
        setTugas(res.data.data);
      });
  };

  const getTotal = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/user/mingguan", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setTotal(res.data.data);
      });
  };

  const tugasSelesai = (): number => {
    let terbaru: number = tugas
      ? tugas.filter((data) => data.status == "Selesai").length
      : 0;
    return terbaru;
  };

  const tugasTerlambat = (): number => {
    let terbaru: number = tugas
      ? tugas.filter((data) => data.terlambat == true).length
      : 0;
    return terbaru;
  };

  const columns: TableColumn<Mingguan>[] = [
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Total Tugas",
      selector: (row) => row._count.user_tugas,
      cell: (row) => {
        return (
          <p className="font-bold text-primary">{row._count.user_tugas}</p>
        );
      },
    },
  ];

  useEffect(() => {
    getTugas();
    getTotal();
  }, []);

  return (
    <div className="flex gap-5 font-poppins flex-col">
      <Navbar title="Dasbor" />
      <div className="flex mt-5 flex-col h-100">
        <div className="flex-1 p-6 gap-5 text-lg flex flex-row bg-white border-1 border-black rounded-lg">
          <div className="flex font-bold flex-col flex-2">
            <p>Total Tugas Mingguan</p>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Counter
              title="Tugas Selesai"
              icon="/assets/icons/checklist.svg"
              textColor="black"
              value={tugasSelesai()}
              background="bg-primary-200"
            />
            <Counter
              title="Tugas Terlambat"
              icon="/assets/icons/cross.svg"
              textColor="white"
              value={tugasTerlambat()}
              background="bg-red"
            />
            <More style="self-end" />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-100 gap-5">
        <div className="flex-2 flex flex-col items-center p-6 bg-white border-1 border-black rounded-lg bg-primary">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Terbaru</p>
            <div onClick={()=>navigate("/admin/semua-tugas")}>
              <More />
            </div>
          </div>
          <SummaryTable click={(id)=>navigate("/admin/semua-tugas/tugas/" + id)} data={filterRange(tugas!, 7)} />
        </div>
        <div className="flex-1 bg-white border-1 flex flex-col p-6 items-center border-black rounded-lg">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Performa Mingguan</p>
            <More />
          </div>
          <DataTable
            highlightOnHover
            theme="tables"
            columns={columns}
            data={total ? total : []}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
