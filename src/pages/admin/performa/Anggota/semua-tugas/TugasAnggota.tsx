import { useNavigate, useParams } from "react-router";
import Navbar from "../../../../../component/Navbar";
import SummaryTable from "../../../../../component/table/SummaryTable";
import { useEffect, useState } from "react";
import api from "../../../../../utils/Api";
import { useToken } from "../../../../../utils/Cookies";
import { Tugas } from "../../../../../models/task/task";
import { TableColumn } from "react-data-table-component";
import { formatDate } from "../../../../../utils/DateFormat";

function TugasAnggota() {
  const {bulan,tahun,id} = useParams()
  const navigate = useNavigate();
  const {getToken} = useToken();
  const [tugas,setTugas] = useState<Tugas[]>();

    const getTugas = async () => {
    await api
      .post("/user/bulanan/" + id,
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
  },[])

  const columns: TableColumn<Tugas>[] = [
    {
      name: "Judul",
      selector: (row) => row.judul,
      cell : (row)=>{
        return <p className={row.terlambat? `text-red font-bold` : `text-black` }>{row.judul}</p>
      }
    },
    {
      name: "Kuantitas",
      selector: (row)=> row.kuantitas
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
              <div className="px-5 py-1 font-medium rounded-md w-28 text-center  bg-yellow text-black">
                <p>Revisi</p>
              </div>
            );
        }
      },
    },
  ];

  return (
    <div className="flex font-poppins flex-col gap-5">
      <div className="flex flex-row gap-3">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src="/assets/icons/back.svg"
          alt="back"
        />
        <Navbar title="Semua Tugas" />
      </div>
      <div className="p-8 border-2 bg-white h-screen rounded-lg">
        <SummaryTable column={columns} data={tugas!} click={(id)=>navigate("/admin/semua-tugas/tugas/" + id)} />
      </div>
    </div>
  );
}

export default TugasAnggota;
