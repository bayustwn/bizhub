import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { Mingguan } from "../../../models/task/task";
import DataTable, { TableColumn } from "react-data-table-component";
import { Posisi } from "../../../models/posisi";
import toast from "react-hot-toast";
import AnggotaModal from "../../../component/modal/AnggotaModal";
import ConfirmModal from "../../../component/modal/ConfirmModal";

function Anggota() {
  const { getToken } = useToken();
  const [anggotaTim, setAnggotaTim] = useState<Mingguan[]>();
  const [posisi, setPosisi] = useState<Posisi[]>();
  const [tambah, setTambah] = useState<boolean>(false);
  const [edit, setEdit] = useState<boolean>(false);
  const [hapus, setHapus] = useState<boolean>(false);
  const [id, setId] = useState<string>();

  const hapusAnggota = async (id: string) => {
    await api
      .delete("/pengguna/hapus/" + id, {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then(() => {
        toast.success("Berhasil Menghapus Anggota!");
        getAnggotaTim();
      })
      .catch(() => {
        toast.error("Gagal Menghapus Anggota!");
      });
  };

  const ambilPosisi = async () => {
    await api
      .get("/pengguna/posisi", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setPosisi(res.data.data);
      });
  };

  const getAnggotaTim = async () => {
    await api
      .get("/pengguna", {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      })
      .then((res) => {
        setAnggotaTim(res.data.data);
      });
  };

  useEffect(() => {
    getAnggotaTim();
  }, []);

  const columns: TableColumn<Mingguan>[] = [
    {
      name: "Nama",
      selector: (row) => row.nama,
      maxWidth: "160px"
    },
    {
      name: "Tugas Aktif",
      selector: (row) => row._count.tugas_pengguna,
      center: true,
      cell: (row) => {
        return (
          <p className="font-bold text-primary">{row._count.tugas_pengguna || 0}</p>
        );
      },
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex flex-row">
          <button
            onClick={() => {
              setId(row.id);
              setTimeout(() => setEdit(true), 0);
            }}
            className="cursor-pointer text-white px-3 py-1 rounded"
          >
            <img
              src="/assets/icons/edit.svg"
              className="hover:w-4 transition-all w-3"
              alt="hapus"
            />
          </button>
          <button
            onClick={() => {
              setId(row.id);
              setTimeout(() => setHapus(true), 0);
            }}
            className="cursor-pointer text-white px-3 py-1 rounded"
          >
            <img
              src="/assets/icons/trash.svg"
              className="hover:w-4 transition-all w-3"
              alt="hapus"
            />
          </button>
        </div>
      ),
      ignoreRowClick: true,
    },
  ];

  useEffect(() => {
    ambilPosisi();
  }, []);

  return (
    <div className="relative flex flex-col gap-5 w-full h-full font-poppins">
      <AnggotaModal
        posisi={posisi || []}
        tambah={true}
        isOpen={tambah}
        title="Tambah Anggota"
        message="Isi data yang dibutuhkan untuk menambah anggota baru."
        onConfirm={() => {
          setTambah(false);
          getAnggotaTim();
        }}
        confirmText="Tambah"
        onCancel={() => setTambah(false)}
      />
      <AnggotaModal
        posisi={posisi || []}
        id={id}
        tambah={false}
        isOpen={edit}
        title="Ubah Anggota"
        message="Isi data yang dibutuhkan untuk mengubah anggota"
        onConfirm={() =>{
           setEdit(false)
           getAnggotaTim()
        }}
        confirmText="Ubah"
        onCancel={() => setEdit(false)}
      />
      <ConfirmModal
        isOpen={hapus}
        title="Yakin untuk menghapus anggota?"
        message="Setelah anggota dihapus tidak dapat dikembalikan!"
        onCancel={() => setHapus(false)}
        confirmText="Hapus Anggota"
        onConfirm={() =>{
           hapusAnggota(id!)
           setHapus(false)
        }}
      />
      <div
        onClick={() => setTambah(true)}
        className="absolute bottom-0 right-0 cursor-pointer flex bg-primary-200 border-2 border-primary py-3 px-4 rounded-4xl flex-row gap-3"
      >
        <p className="font-bold text-primary">Tambah Anggota</p>
        <img src="/assets/icons/plus.svg" alt="tambah anggota" />
      </div>
      <Navbar title="Anggota Tim" />
      <div className="flex flex-row text-white font-medium gap-2 mt-8">
        {posisi?.map((posisi, index) => {
          return (
            <div
              key={posisi.id}
              className={`flex-1 flex flex-row items-center justify-between px-5 rounded-lg h-15 ${
                index % 2 == 0
                  ? "bg-primary text-white"
                  : "bg-primary-200 text-primary"
              } `}
            >
              <p>{posisi.posisi}</p>
            </div>
          );
        })}
      </div>
      <div className="flex flex-row gap-2 w-full h-fit">
        {posisi?.map((posisi) => {
          return (
            <div
              key={posisi.id}
              className="flex flex-col flex-1 bg-white rounded-lg border-2 border-black"
            >
              <DataTable
                highlightOnHover
                theme="tables"
                pointerOnHover
                columns={columns}
                data={
                  anggotaTim
                    ? anggotaTim?.filter(
                        (data) => data.posisi == posisi.posisi
                      )!
                    : []
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Anggota;
