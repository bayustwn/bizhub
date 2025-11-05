import { useNavigate, useParams } from "react-router";
import Navbar from "../../../component/Navbar";
import SummaryTable from "../../../component/table/SummaryTable";
import { useEffect, useState } from "react";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { Tugas } from "../../../models/task/task";
import { TableColumn } from "react-data-table-component";
import { formatDate } from "../../../utils/DateFormat";

function SemuaTugasTeam() {
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

  const columns: TableColumn<Tugas>[] = [
    {
      name: "Judul",
      selector: (row) => row.judul,
      sortable: true,
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
    {
      name: "Deadline",
      selector: (row) => formatDate(row.deadline),
      sortable: true,
    },
    {
      name: "Kuantitas",
      selector: (row) => row.kuantitas,
      sortable: true,
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
        <Navbar id={(id) => setId(id)} title="Semua Tugas" />
      </div>
      <div className="p-8 border-2 bg-white h-screen rounded-lg">
        <SummaryTable 
          column={columns} 
          data={tugas || []} 
          click={(id) => navigate("/team/semua-tugas/tugas/" + id)} 
        />
      </div>
    </div>
  );
}

export default SemuaTugasTeam; 