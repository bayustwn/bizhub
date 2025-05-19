import { useNavigate, useParams } from "react-router";
import Navbar from "../../../../../component/Navbar";
import SummaryTable from "../../../../../component/table/SummaryTable";
import { useEffect, useState } from "react";
import axios from "axios";
import { useToken } from "../../../../../utils/Cookies";
import { Tugas } from "../../../../../models/task/task";

function TugasTerlambat() {
  const {bulan,tahun,id} = useParams()
  const navigate = useNavigate();
  const {getToken} = useToken();
  const [tugas,setTugas] = useState<Tugas[]>();

    const getTugas = async () => {
    await axios
      .post(
        import.meta.env.VITE_BASE_URL + "/user/bulanan/" + id,
        {
          bulan: Number(bulan),
          tahun: Number(tahun),
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((res) => {
        setTugas(res.data.data.user_tugas)
      });
  };

  useEffect(()=>{
    getTugas()
    console.log(bulan)
  },[])

  return (
    <div className="flex font-poppins flex-col gap-5">
      <div className="flex flex-row gap-3">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src="/assets/icons/back.svg"
          alt="back"
        />
        <Navbar title="Tugas Terlambat" />
      </div>
      <div className="p-8 border-2 bg-white h-screen rounded-lg">
        <SummaryTable data={tugas?.filter(tugas=>tugas.terlambat) || []} click={(id)=>navigate("/admin/semua-tugas/tugas/" + id)} />
      </div>
    </div>
  );
}

export default TugasTerlambat;
