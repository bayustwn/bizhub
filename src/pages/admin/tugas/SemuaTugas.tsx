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

function SemuaTugas() {
  const [tugas, setTugas] = useState<Tugas[]>();
  const navigate = useNavigate();
  const { getToken } = useToken();
  const [modal,setModal] = useState<boolean>(false);
  const [id,setId] = useState<string>()

  const konfirmasiHapus = (id:string) =>{
    setId(id)
    setModal(true)
  }

  const hapusTugas = async() =>{
    await axios.delete(import.meta.env.VITE_BASE_URL + "/tugas/delete/" + id,{
      headers : {
        Authorization : "Bearer " + getToken()
      }
    }).then(async (res)=>{
      await ambilSemuaTugas().then(()=>{
        setModal(false)
        toast.success(res.data.message)
      })
    })
  }

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
      <div onClick={()=>{
        navigate(location.pathname + "/tugas/tambah")
      }} className="bg-primary-200 border-2 bottom-10 right-10 cursor-pointer border-primary flex flex-row items-center gap-5 py-3 px-5 text-primary font-bold absolute rounded-4xl">
        <p className="text-md">Tambah Tugas</p>
        <img width={15} src="/assets/icons/plus.svg" alt="add" />
      </div>
      <ConfirmModal confirmText="Hapus" title="Yakin ingin menghapus?" message="Data tugas tidak dapat dipulihkan setelah di hapus!" isOpen={modal} onCancel={()=>{setModal(false)}} onConfirm={()=>{hapusTugas()}} />
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
                      key={index}
                      admin={true}
                      onClick={()=>navigate(`${location.pathname}/tugas/` + tugas.id)}
                      index={index}
                      judul={tugas.judul}
                      kuantitas={tugas.kuantitas}
                      deadline={tugas.deadline}
                      user={tugas.user_tugas.length}
                      onDelete={()=>konfirmasiHapus(tugas.id) }
                      onEdit={()=>navigate(`${location.pathname}/tugas/edit/` + tugas.id)}
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
