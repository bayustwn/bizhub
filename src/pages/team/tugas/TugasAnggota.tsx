import axios from "axios";
import Navbar from "../../../component/Navbar";
import Status from "../../../component/status/Status";
import { StatusModel } from "../../../models/task/status";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";
import { Tugas } from "../../../models/task/task";
import { useNavigate } from "react-router";
import TugasCard from "../../../component/card/TugasCard";
import { closestCorners, DndContext, PointerSensor, useDroppable, useSensor, useSensors} from '@dnd-kit/core';


function PenggunaTugas() {
  const [id, setId] = useState<string>();
  const navigate = useNavigate();
  const [semuaTugas, setSemuaTugas] = useState<Tugas[]>([]);
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

    const updateStatus = async (id: string, status: string) => {
    await axios
      .put(
        import.meta.env.VITE_BASE_URL + "/tugas/update/status",
        {
          id: id,
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then(() => {
        tugasAnggota();
      });
  };

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
  
    const sensors = useSensors(
      useSensor(PointerSensor, {
        activationConstraint: {
          delay: 200,
          tolerance: 5,
        },
      })
    );

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
      <div className="flex gap-5 h-screen w-screen flex-row mt-10 pr-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={(e) => {
            if(e.active.data.current?.status != e.over?.id){
              const index = semuaTugas?.findIndex(
              (tugas) => tugas.id === e.active.id.toString()
            );
            const newTugas = [...semuaTugas];
            newTugas[index].status = e.over?.id.toString() || "";
            newTugas[index].tanggal_diubah = new Date()
            setSemuaTugas(newTugas);
            updateStatus(e.active.id.toString(), e.over?.id.toString() || "");
            }
          }}
        >
          {status.map((data) => {
            const TugasColumn = ({ status }: { status: string }) => {
              const { setNodeRef, isOver, active } = useDroppable({
                id: status,
              });
              return (
                <div key={status} className={`flex flex-col gap-5 w-100`}>
                  <Status
                    style={`${isOver? "border-primary" : "border-black"}`}
                    status={status}
                    value={
                      semuaTugas?.filter((tugas) => tugas.status === status)
                        .length || 0
                    }
                  />
                  <div
                    ref={setNodeRef}
                    id={status}
                    className={`min-h-[200px] transition-all duration-200 p-2 rounded-xl`}
                  >
                    {semuaTugas
                      .sort((a, b) => {
                        const tanggalA = a.tanggal_diubah
                          ? new Date(a.tanggal_diubah).getTime()
                          : 0;
                        const tanggalB = b.tanggal_diubah
                          ? new Date(b.tanggal_diubah).getTime()
                          : 0;
                        return tanggalA - tanggalB;
                      })
                      ?.filter((tugasItem) => tugasItem.status === status)
                      .map((tugasItem) => {
                        const isDragging = active?.id === tugasItem.id;
                        return (
                          <TugasCard
                            key={tugasItem.id}
                            id={tugasItem.id}
                            terlambat={tugasItem.terlambat}
                            admin={false}
                            status={tugasItem.status}
                            onClick={() =>
                              navigate(
                                `${location.pathname}/tugas/` + tugasItem.id
                              )
                            }
                            index={0}
                            judul={tugasItem.judul}
                            kuantitas={tugasItem.kuantitas}
                            deadline={tugasItem.deadline}
                            user={tugasItem.user_tugas.length}
                            style={`transition-all ${
                              isDragging ? "border-primary" : "border-black"
                            }`}
                          />
                        );
                      })}
                  </div>
                </div>
              );
            };

            return <TugasColumn key={data.status} status={data.status} />;
          })}
        </DndContext>
      </div>
    </div>
  );
}

export default PenggunaTugas;
