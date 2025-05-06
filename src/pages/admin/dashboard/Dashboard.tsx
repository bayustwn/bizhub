import axios from "axios";
import Counter from "../../../component/card/Counter";
import More from "../../../component/card/More";
import Navbar from "../../../component/Navbar";
import { useEffect, useState } from "react";
import { useToken } from "../../../utils/Cookies";

function Dashboard() {
  const [id, setId] = useState<string>();
  const { getToken } = useToken();
  const [dataTugasSelesai,setDataTugasSelesai] = useState("");

  const getId = (id:string) =>{
    setId(id);
  }

  const tugasSelesai = async () => {
    await axios
      .get(import.meta.env.VITE_BASE_URL + "/tugas/user/" + id, {
        headers: { Authorization: "Bearer " + getToken() },
      })
      .then((res) => {
        console.log(res.data.data)
        setDataTugasSelesai(res.data.data);
      })
  };

  const tugasTerlambat = () => {};

  useEffect(()=>{
    tugasSelesai();
  },[])

  return (
    <div className="flex gap-5 font-poppins flex-col">
      <Navbar id={getId} title="Dasbor"  />
      <div className="flex mt-5 flex-col h-100">
        <div className="flex-1 p-6 gap-5 text-lg flex flex-row bg-white border-1 border-black rounded-lg">
          <div className="flex font-bold flex-col flex-2">
            <p>Total Tugas Mingguan</p>
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <Counter
              title="Tugas Selesai"
              icon="/assets/icons/checklist.svg"
              textColor="black"
              value={10}
              background="primary-200"
            />
            <Counter
              title="Tugas Terlambat"
              icon="/assets/icons/cross.svg"
              textColor="white"
              value={10}
              background="[#000000]"
            />
            <More style="self-end" />
          </div>
        </div>
      </div>
      <div className="flex flex-row h-100 gap-5">
        <div className="flex-1 flex flex-col items-center p-6 bg-white border-1 border-black rounded-lg bg-primary">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Selesai</p>
            <More />
          </div>
        </div>
        <div className="flex-1 bg-white border-1 flex flex-col p-6 items-center border-black rounded-lg">
          <div className="flex flex-row justify-between w-full items-center">
            <p className="font-bold">Tugas Revisi</p>
            <More />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
