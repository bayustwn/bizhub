import { useNavigate, useParams } from "react-router";
import Navbar from "../../../component/Navbar";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { id } from "date-fns/locale/id";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { useEffect, useState } from "react";
import { Tugas, User } from "../../../models/task/task";
import TextareaAutosize from "react-textarea-autosize";
import toast from "react-hot-toast";

registerLocale("id-ID", id);

function TambahTugas() {
  const { getToken } = useToken();
  const [detail, setDetail] = useState<Tugas>({
    id: "",
    brief: "",
    deadline: new Date().toISOString().split("T")[0],
    id_admin: "",
    judul: "",
    kuantitas: 0,
    status: "",
    terlambat: false,
    user_tugas: [],
  });
  const [userTugas, setUserTugas] = useState<User[]>([]);
  const [semuaAnggota, setSemuaAnggota] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const tambah = async () => {
    await api
      .post("/tugas/add",
        {
          ...detail,
          user_tugas: userTugas,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((res) => {
        navigate("/admin/semua-tugas");
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const anggota = async () => {
    await api
      .get("/user", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setSemuaAnggota(res.data.data);
      });
  };

  useEffect(() => {
    anggota();
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
        <Navbar title="Tambah Tugas" />
      </div>
      <div className="flex justify-between items-center  w-full flex-row">
        <div className="my-5 font-medium px-5 py-1 rounded-4xl text-primary bg-primary-200 border-2 border-primary">
          <p>Dibuat</p>
        </div>
        <button
          onClick={() => tambah()}
          className="py-2 px-10 rounded-lg cursor-pointer font-semibold text-white bg-primary"
        >
          Tambah
        </button>
      </div>

      <div className="w-full bg-white gap-3 flex flex-col auto p-8 border-2 border-black rounded-lg">
        <TextareaAutosize
          className="resize-none outline-none font-bold text-3xl"
          placeholder="Judul Tugas"
          onChange={(e) =>
            setDetail((prev) => ({ ...prev!, judul: e.target.value }))
          }
        />
        <div className="flex flex-row gap-2">
          <div className="bg-primary-200 py-2 px-3 items-center rounded-md flex flex-row gap-2 text-primary">
            <img src="/assets/icons/task.svg" width={15} alt="tugas" />
            <input
              type="text"
              inputMode="numeric"
              maxLength={10}
              pattern="[1-9]*"
              placeholder="0"
              style={{ width: `${String(detail?.kuantitas || 0).length}ch` }}
              className="outline-none"
              value={detail?.kuantitas}
              onChange={(e) =>
                setDetail((prev) => ({
                  ...prev!,
                  kuantitas: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="cursor-pointer">
            <div className="bg-primary-200 px-3 py-2 rounded-md flex flex-row gap-2 text-primary">
              <img src="/assets/icons/clock.svg" width={15} alt="tugas" />
              <DatePicker
                placeholderText="Deadline Tugas"
                selected={new Date(detail.deadline)}
                onChange={(date) =>
                  setDetail((prev) => ({
                    ...prev!,
                    deadline: date?.toISOString().split("T")[0]!,
                  }))
                }
                className={`outline-none rounded`}
                dateFormat="dd MMMM yyyy"
                locale="id-ID"
              />
            </div>
          </div>
        </div>
        <div className="border-1 border-black/20" />
        <div className="min-h-50 my-2 ">
          <TextareaAutosize
            className="font-medium outline-none w-full h-fit resize-none"
            placeholder="Deskripsi serta brief singkat tugas."
            onChange={(e) =>
              setDetail((prev) => ({ ...prev!, brief: e.target.value }))
            }
          />
        </div>
        <div className="border-1 border-black/20" />
        <div className="flex flex-row text-black font-medium gap-2">
          <div className="border-2 border-black flex flex-row gap-2 rounded-4xl px-6 py-1">
            <img src="/assets/icons/file.svg" alt="user" width={13} />
            <p>Script Image</p>
          </div>
        </div>
        <div className="flex flex-row items-center text-primary font-medium gap-2">
          {userTugas?.map((user: User, index) => {
            return (
              <div
                key={index}
                className="relative bg-primary-200 border-2 border-primary flex flex-row gap-2  rounded-4xl px-6 py-1"
              >
                <div
                  onClick={() => {
                    const updatedUserTugas = [...userTugas];
                    updatedUserTugas.splice(index, 1);
                    setUserTugas(updatedUserTugas);
                  }}
                  className="cursor-pointer absolute p-1 rounded-4xl -top-1 -right-1 bg-red flex items-center justify-center"
                >
                  <img src="/assets/icons/cross.svg" width={10} alt="cross" />
                </div>
                <img src="/assets/icons/user.svg" alt="user" width={12} />
                <p>{user.nama}</p>
              </div>
            );
          })}
          {userTugas?.length != semuaAnggota?.length && (
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              className="relative bg-primary-200 border-2 p-3 cursor-pointer border-primary flex flex-row gap-2 rounded-4xl"
            >
              <img src="/assets/icons/plus.svg" alt="user" width={12} />
              {isOpen && (
                <div className="absolute rounded-lg bg-white border-2 border-primary">
                  {semuaAnggota
                    ?.filter(
                      (anggota) =>
                        !userTugas?.some((user) => user.id === anggota.id)
                    )
                    .map((user: User, index) => {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            setUserTugas([...(userTugas || []), user]);
                          }}
                          className="px-5 py-1 rounded-lg hover:bg-primary-200"
                        >
                          <p>{user.nama}</p>
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default TambahTugas;
