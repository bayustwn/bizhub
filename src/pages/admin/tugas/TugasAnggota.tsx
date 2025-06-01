import { useNavigate, useParams } from "react-router";
import Navbar from "../../../component/Navbar";
import Kuantitas from "../../../component/card/Kuantitas";
import Deadline from "../../../component/card/Deadline";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { useEffect, useState } from "react";
import { Tugas, User } from "../../../models/task/task";

function TugasAnggota() {
  const { id } = useParams();
  const { getToken } = useToken();
  const [detail, setDetail] = useState<Tugas>();
  const navigate = useNavigate();

  const ambilTugas = async () => {
    await api
      .get("/tugas/detail/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setDetail(res.data.data.tugas);
      });
  };

  useEffect(() => {
    ambilTugas();
  }, []);

  return (
    <div className="font-poppins flex flex-col">
      <div className="flex flex-row gap-3">
        <img
          onClick={() => navigate(-1)}
          className="cursor-pointer"
          src="/assets/icons/back.svg"
          alt="back"
        />
        <Navbar title="Tugas" />
      </div>
      <div className="self-start my-5 font-medium px-5 py-1 rounded-4xl text-primary bg-primary-200 border-2 border-primary">
        <p>{detail?.status}</p>
      </div>
      <div className="w-full bg-white gap-3 flex flex-col auto p-8 border-2 border-black rounded-lg">
        <p className="font-bold text-3xl">{detail?.judul}</p>
        <div className="flex flex-row gap-2">
          <Kuantitas kuantitas={detail?.kuantitas || 0} />
          <Deadline deadline={detail?.deadline || ""} />
        </div>
        <div className="border-1 border-black/20" />
        <div className="min-h-50 my-2 ">
          <p className="font-medium">{detail?.brief}</p>
        </div>
        <div className="border-1 border-black/20" />
        <div className="flex flex-row flex-wrap text-black font-medium gap-2">
          {detail?.file.map((file) => {
            return (
              <div
                key={file.id}
                onClick={()=>window.open(file.url, "_blank")}
                className="border-2 cursor-pointer border-black flex flex-row gap-2 rounded-4xl px-6 py-1"
              >
                <img src="/assets/icons/file.svg" alt="user" width={13} />
                <p>{file.nama}</p>
              </div>
            );
          })}
        </div>
        <div className="flex flex-row flex-wrap text-primary font-medium gap-2">
          {detail?.user_tugas.map((user: User, index) => {
            return (
              <div
                key={index}
                className="bg-primary-200 border-2 border-primary flex flex-row gap-2  rounded-4xl px-6 py-1"
              >
                <img src="/assets/icons/user.svg" alt="user" width={12} />
                <p>{user.nama}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default TugasAnggota;
