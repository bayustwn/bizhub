import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Status from "../../../component/status/Status";
import { StatusModel } from "../../../models/task/status";
import { Tugas } from "../../../models/task/task";
import axios from "axios";
import { useToken } from "../../../utils/Cookies";
import TugasCard from "../../../component/card/TugasCard";
import { useNavigate } from "react-router";

function SemuaTugas() {
  const [tugas, setTugas] = useState<Tugas[]>();
  const navigate = useNavigate()
  const { getToken } = useToken();

  const ambilSemuaTugas = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/tugas", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setTugas(res.data.data);
      });
  };

  useEffect(() => {
    ambilSemuaTugas();
  }, []);

  const status: StatusModel[] = [
    {
      status: "Dibuat",
      value: 0,
    },
    {
      status: "Dikerjakan",
      value: 0,
    },
    {
      status: "Ditinjau",
      value: 0,
    },
    {
      status: "Revisi",
      value: 0,
    },
    {
      status: "Selesai",
      value: 0,
    },
  ];

  return (
    <div className="flex flex-col font-poppins gap-2">
      <Navbar title="Semua Tugas" style="w-screen pr-10" />
      <div className="flex gap-5 w-screen flex-row mt-10 overflow-y-auto pr-10">
        {status.map((data, index) => {
          return (
            <div key={index} className="flex flex-col gap-5 w-100">
              <Status
                status={data.status}
                value={
                  tugas?.filter((tugas) => tugas.status == data.status)
                    .length || 0
                }
              />
              {tugas
                ?.filter((tugas) => tugas.status == data.status)
                .map((tugas, index) => {
                  return (
                    <TugasCard
                      onClick={()=>navigate('/admin/tugas/' + tugas.id)}
                      index={index}
                      judul={tugas.judul}
                      kuantitas={tugas.kuantitas}
                      deadline={tugas.deadline}
                      user={tugas.user_tugas.length}
                    />
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SemuaTugas;
