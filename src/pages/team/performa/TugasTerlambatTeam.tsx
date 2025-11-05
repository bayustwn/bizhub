import { useNavigate, useParams } from "react-router";
import Navbar from "../../../component/Navbar";
import SummaryTable from "../../../component/table/SummaryTable";
import { useEffect, useState } from "react";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { Tugas } from "../../../models/task/task";

function TugasTerlambatTeam() {
  const { bulan, tahun } = useParams();
  const navigate = useNavigate();
  const { getToken } = useToken();
  const [tugas, setTugas] = useState<Tugas[]>();
  const [id, setId] = useState<string>();

  const getTugas = async () => {
    if (!id) return;
    
    await api
      .post("/pengguna/bulanan/" + id,
        {
          bulan: Number(bulan),
          tahun: Number(tahun),
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((res) => {
        setTugas(res.data.data.tugas_pengguna);
      });
  };

  useEffect(() => {
    if (id) {
      getTugas();
    }
  }, [id, bulan, tahun]);

  return (
    <div className="flex font-poppins flex-col gap-5">
      <div className="flex flex-row gap-3">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src="/assets/icons/back.svg"
          alt="back"
        />
        <Navbar id={(id) => setId(id)} title="Tugas Terlambat" />
      </div>
      <div className="p-8 border-2 bg-white h-screen rounded-lg">
        <SummaryTable 
          data={tugas?.filter(tugas => tugas.terlambat) || []} 
          click={(id) => navigate("/team/semua-tugas/tugas/" + id)} 
        />
      </div>
    </div>
  );
}

export default TugasTerlambatTeam; 