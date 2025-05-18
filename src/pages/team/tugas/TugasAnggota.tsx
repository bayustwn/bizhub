import axios from "axios";
import Navbar from "../../../component/Navbar";
import Status from "../../../component/status/Status";
import { StatusModel } from "../../../models/task/status";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";
import { Tugas } from "../../../models/task/task";
import { useNavigate } from "react-router";
import TugasCard from "../../../component/card/TugasCard";
import {DndContext} from '@dnd-kit/core';


function PenggunaTugas() {
  const [id, setId] = useState<string>();
  const navigate = useNavigate();
  const [semuaTugas, setSemuaTugas] = useState<Tugas[]>();
  const { getToken } = useToken();

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

  const tugasAnggota = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/tugas/user/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setSemuaTugas(res.data.data);
      });
  };

  useEffect(() => {
    if (id) {
      tugasAnggota();
    }
  }, [id]);

  return (
    <div className="flex flex-col z-index-0 font-poppins gap-2">
      <Navbar
        id={(id) => setId(id)}
        title="Semua Tugas"
        style="w-screen pr-10"
      />
      <DndContext>
      <div className="flex gap-5 z-index-10 w-screen h-screen flex-row mt-10 pr-10">
          {status.map((data, index) => {
          return (
            <div
              key={index}
              className="flex cursor-pointer flex-col gap-5 w-100"
            >
              <Status
                status={data.status}
                value={
                  semuaTugas?.filter((tugas) => tugas.status == data.status)
                    .length || 0
                }
              />
              {semuaTugas
                ?.filter((tugas) => tugas.status == data.status)
                .map((tugas, index) => {
                  return (
                    <TugasCard
                    id={tugas.id}
                      terlambat={tugas.terlambat}
                      key={index}
                      status={data.status}
                      admin={false}
                      onClick={() =>
                        navigate(`${location.pathname}/tugas/` + tugas.id)
                      }
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
      </DndContext>
    </div>
  );
}

export default PenggunaTugas;
