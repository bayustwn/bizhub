import toast from "react-hot-toast";
import { Posisi } from "../../models/posisi";
import api from "../../utils/Api";
import { useToken } from "../../utils/Cookies";
import Form from "../input/Form";
import { useEffect, useState } from "react";
import { User } from "../../models/task/task";

interface Modal {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
  posisi?: Posisi[];
  tambah: boolean;
  id?: string;
}

const AnggotaModal = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText,
  posisi,
  tambah,
  id,
}: Modal) => {
  if (!isOpen) return null;
  const [anggota, setAnggota] = useState<User>({
    nama : "",
    posisi : posisi?.[0].posisi!,
    email : ""
  });
  const [password, setPassword] = useState<string>();
  const { getToken } = useToken();

  const tambahAnggota = async () => {
    await api
      .post(
        "/user/create",
        {
          ...anggota,
          password,
        },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then(() => {
        toast.success("Sukses Menambah Anggota");
      }).catch(()=>{
        toast.error("Error menambah anggota")
      });
  };

  const detail = async() => {
    await api
      .get("/user/detail/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setAnggota(res.data.data);
      });
  };

  const ubahAnggota = async () => {
    await api.put("/user/ubah/" + id, {
      ...anggota,
      password : password
    },{
      headers : {
        Authorization : "Bearer " + getToken()
      }
    }).then(()=>{
      toast.success("Anggota Berhasil diubah!")
    }).catch(()=>{
      toast.error("Anggota Gagal diubah!")
    });
  };

  useEffect(() => {
    if (!tambah) {
      detail();
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 cursor-default flex font-poppins items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl text-primary font-bold mb-3">{title}</h2>
        <p className="text-black">{message}</p>
        <div className="flex flex-col gap-2 mt-3">
          <p className="font-semibold">Informasi Pribadi</p>
          <Form
            icon="/assets/icons/inactive/user.svg"
            onChange={(e) => setAnggota({ ...anggota!, nama: e.target.value })}
            value={anggota?.nama}
            placeholder="Nama Anggota"
          />
          <Form
            icon="/assets/icons/email.svg"
            onChange={(e) => setAnggota({ ...anggota!, email: e.target.value })}
            value={anggota?.email}
            placeholder="Email"
            type="email"
          />
          <Form
            icon="/assets/icons/pass.svg"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            type="text"
          />
          <p className="font-semibold">Posisi</p>
          <select
            value={anggota?.posisi}
            onChange={(e) =>
              setAnggota({ ...anggota!, posisi: e.target.value })
            }
            className="border-2 border-black outline-none p-3 rounded-md"
          >
            {posisi?.map((posisi) => {
              return (
                <option key={posisi.id} value={posisi.posisi}>
                  {posisi.posisi}
                </option>
              );
            })}
          </select>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 cursor-pointer py-2 rounded bg-primary-200 text-primary"
          >
            Batal
          </button>
          <button
            onClick={async () => {
              if (tambah) {
                await tambahAnggota();
              } else {
                await ubahAnggota();
              }
              onConfirm();
            }}
            className="px-4 font-semibold cursor-pointer py-2 rounded bg-primary text-white"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnggotaModal;
