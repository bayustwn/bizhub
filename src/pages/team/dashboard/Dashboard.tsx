import api from "../../../utils/Api";
import Counter from "../../../component/card/Counter";
import More from "../../../component/card/More";
import Navbar from "../../../component/Navbar";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";
import { Tugas } from "../../../models/task/task";
import SummaryTable from "../../../component/table/SummaryTable";
import { filterRange } from "../../../utils/FilterTugas";
import { useNavigate } from "react-router";
import KomponenGrafikMingguan from "../../../component/chart/KomponenGrafikMingguan";

function Dashboard() {
  const navigate = useNavigate()
  const [id, setId] = useState<string>();
  const { getToken } = useToken();
  const [tugas, setTugas] = useState<Tugas[]>();

  const getTugas = async () => {
    await api
      .get("/tugas/user/" + id, {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((res) => {
        setTugas(res.data.data);
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
      ? tugas.filter((data) => data.terlambat).length
      : 0;
    return terbaru;
  };

  useEffect(() => {
    if (id) {
      getTugas();
    }
  }, [id]);

  return (
    <div className="flex gap-5 font-poppins flex-col">
      <Navbar id={(id) => setId(id)} title="Dasbor" />
      <div className="flex mt-5 flex-col h-100">
        <div className="flex-1 p-6 gap-5 text-lg flex flex-row bg-white border-1 border-black rounded-lg">
          <div className="flex font-bold flex-col flex-2">
            <p>Total Tugas Mingguan</p>
            <KomponenGrafikMingguan tugas={tugas || []} />
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
            <div className="self-end" onClick={()=>navigate("/team/performa")}>
              <More />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-100 gap-5">
        <div className="flex-1 flex flex-col items-center p-6 bg-white border-1 border-black rounded-lg bg-primary">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Terbaru</p>
            <div onClick={()=>navigate("/team/semua-tugas")}>
              <More />
            </div>
          </div>
          <SummaryTable click={(id)=>navigate("/team/semua-tugas/tugas/" + id) } data={filterRange(tugas!, 7).splice(0,5)} />
        </div>
        <div className="flex-1 bg-white border-1 flex flex-col p-6 items-center border-black rounded-lg">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Revisi</p>
            <div onClick={()=>navigate("/team/semua-tugas")}>
              <More />
            </div>
          </div>
          <SummaryTable click={(id)=>navigate("/team/semua-tugas/tugas/" + id) } data={filterRange(tugas!, 7).filter((tugas)=>tugas.status == "Revisi").splice(0,5)} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
