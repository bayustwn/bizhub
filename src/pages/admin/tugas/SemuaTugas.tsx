import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import Status from "../../../component/status/Status";
import { StatusModel } from "../../../models/task/status";
import { Tugas } from "../../../models/task/task";
import axios from "axios";
import { useToken } from "../../../utils/Cookies";
import TugasCard from "../../../component/card/TugasCard";
import { useNavigate } from "react-router";
import ConfirmModal from "../../../component/modal/ConfirmModal";
import toast from "react-hot-toast";
import {
  closestCorners,
  DndContext,
  useDroppable,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

function SemuaTugas() {
  const [tugas, setTugas] = useState<Tugas[]>([]);
  const navigate = useNavigate();
  const { getToken } = useToken();
  const [modal, setModal] = useState<boolean>(false);
  const [id, setId] = useState<string>();

  const konfirmasiHapus = (id: string) => {
    setId(id);
    setModal(true);
  };

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
        ambilSemuaTugas();
      });
  };

  const hapusTugas = async () => {
    await axios
      .delete(import.meta.env.VITE_BASE_URL + "/tugas/delete/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then(async (res) => {
        await ambilSemuaTugas().then(() => {
          setModal(false);
          toast.success(res.data.message);
        });
      });
  };

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
    { status: "Dibuat", value: 0 },
    { status: "Dikerjakan", value: 0 },
    { status: "Ditinjau", value: 0 },
    { status: "Revisi", value: 0 },
    { status: "Selesai", value: 0 },
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    })
  );

  return (
    <div className="flex flex-col font-poppins gap-2">
      <div
        onClick={() => navigate(location.pathname + "/tugas/tambah")}
        className="bg-primary-200 border-2 bottom-10 right-10 cursor-pointer border-primary flex flex-row items-center gap-5 py-3 px-5 text-primary font-bold absolute rounded-4xl"
      >
        <p className="text-md">Tambah Tugas</p>
        <img width={15} src="/assets/icons/plus.svg" alt="add" />
      </div>

      <ConfirmModal
        confirmText="Hapus"
        title="Yakin ingin menghapus?"
        message="Data tugas tidak dapat dipulihkan setelah dihapus!"
        isOpen={modal}
        onCancel={() => setModal(false)}
        onConfirm={hapusTugas}
      />

      <Navbar title="Semua Tugas" style="w-screen pr-10" />

      <div className="flex gap-5 h-screen w-screen flex-row mt-10 pr-10">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCorners}
          onDragEnd={(e) => {
            if(e.active.data.current?.status != e.over?.id){
              const index = tugas.findIndex(
              (tugas) => tugas.id === e.active.id.toString()
            );
            const newTugas = [...tugas];
            newTugas[index].status = e.over?.id.toString() || "";
            newTugas[index].tanggal_diubah = new Date()
            setTugas(newTugas);
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
                      tugas?.filter((tugas) => tugas.status === status)
                        .length || 0
                    }
                  />
                  <div
                    ref={setNodeRef}
                    id={status}
                    className={`min-h-[200px] transition-all duration-200 p-2 rounded-xl`}
                  >
                    {tugas
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
                            admin={true}
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
                            onDelete={() => konfirmasiHapus(tugasItem.id)}
                            onEdit={() =>
                              navigate(
                                `${location.pathname}/tugas/edit/` +
                                  tugasItem.id
                              )
                            }
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

export default SemuaTugas;
