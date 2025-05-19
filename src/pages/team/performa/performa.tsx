import axios from "axios";
import Counter from "../../../component/card/Counter";
import More from "../../../component/card/More";
import Navbar from "../../../component/Navbar";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";
import { Bulanan } from "../../../models/task/task";
import SummaryTable from "../../../component/table/SummaryTable";
import { useNavigate } from "react-router";

function Performa() {
  const { getToken } = useToken();
  const navigate = useNavigate();
  const [id,setId] = useState<string>()
  const [bulnanan, setBulanan] = useState<Bulanan>();
  const [bulanTahun,setBulanTahun] = useState<{bulan:number,tahun:number}>({
    bulan : new Date().getMonth()+1,
    tahun: new Date().getFullYear(),
  })

  const listBulan = [
    { value: 1, label: "Januari" },
    { value: 2, label: "Februari" },
    { value: 3, label: "Maret" },
    { value: 4, label: "April" },
    { value: 5, label: "Mei" },
    { value: 6, label: "Juni" },
    { value: 7, label: "Juli" },
    { value: 8, label: "Agustus" },
    { value: 9, label: "September" },
    { value: 10, label: "Oktober" },
    { value: 11, label: "November" },
    { value: 12, label: "Desember" },
  ];

  const getTugas = async () => {
    await axios
      .post(
        import.meta.env.VITE_BASE_URL + "/user/bulanan/" + id,
        {
          bulan: bulanTahun.bulan,
          tahun: bulanTahun.tahun,
        },
        {
          headers: { Authorization: "Bearer " + getToken() },
        }
      )
      .then((res) => {
        setBulanan(res.data.data);
      });
  };

  const tugasSelesai = (): number => {
    let terbaru: number = bulnanan?.user_tugas
      ? bulnanan.user_tugas?.filter((data) => data.status == "Selesai").length
      : 0;
    return terbaru;
  };

  const tugasTerlambat = (): number => {
    let terbaru: number = bulnanan?.user_tugas
      ? bulnanan?.user_tugas.filter((data) => data.terlambat == true).length
      : 0;
    return terbaru;
  };

  useEffect(()=>{
    if(id){
        getTugas();
    }
  },[id,bulanTahun])

  return (
    <div className="flex gap-5 font-poppins flex-col">
        <Navbar id={(id)=>setId(id)} title={`Performa ${bulnanan?.nama!}`} />
      <div className="flex flex-row gap-3">
        <div className="cursor-pointer self-start font-medium px-5 py-1 rounded-4xl text-primary bg-primary-200 border-2 border-primary">
          <select className="outline-none" value={bulanTahun.bulan} onChange={(e)=>{
            setBulanTahun({...bulanTahun, bulan: Number(e.target.value)})
          }}>
            {Array.from(listBulan, (bulan, i) => {
              return (
                <option key={i} value={bulan.value}>
                  {bulan.label}
                </option>
              );
            })}
          </select>
        </div>
        <div className="cursor-pointer self-start font-medium px-5 py-1 rounded-4xl text-primary bg-primary-200 border-2 border-primary">
          <select className="outline-none" onChange={(e)=>setBulanTahun({...bulanTahun, tahun: Number(e.target.value)})}>
            {Array.from({ length: 30 }, (_, i) => {
              const year = new Date().getFullYear() - i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="flex flex-col h-100">
        <div className="flex-1 p-6 gap-5 text-lg flex flex-row bg-white border-1 border-black rounded-lg">
          <div className="flex font-bold flex-col flex-2">
            <p>Total Tugas</p>
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
          </div>
        </div>
      </div>
      <div className="flex flex-row h-100 gap-5">
        <div className="flex-1 flex flex-col items-center p-6 bg-white border-1 border-black rounded-lg bg-primary">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Semua Tugas</p>
            <div onClick={() => navigate("/admin/performa/anggota/semua-tugas/" + `${bulanTahun.bulan}/${bulanTahun.tahun}/${id}`)}>
              <More />
            </div>
          </div>
          <SummaryTable
            click={(id) => navigate("/admin/semua-tugas/tugas/" + id)}
            data={bulnanan?.user_tugas!}
          />
        </div>
        <div className="flex-1 bg-white border-1 flex flex-col p-6 items-center border-black rounded-lg">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Terlambat</p>
            <div onClick={() => navigate("/admin/performa/anggota/semua-tugas/terlambat/" + `${bulanTahun.bulan}/${bulanTahun.tahun}/${id}`)}>
              <More />
            </div>
          </div>
          <SummaryTable
            click={(id) => navigate("/admin/semua-tugas/tugas/" + id)}
            data={
              bulnanan?.user_tugas.filter(
                (tugas) => tugas.terlambat
              )!
            }
          />
        </div>
      </div>
    </div>
  );
}

export default Performa;
