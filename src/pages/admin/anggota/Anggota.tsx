import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { Mingguan } from "../../../models/task/task";
import DataTable, { TableColumn } from "react-data-table-component";
import { Posisi } from "../../../models/posisi";

function Anggota() {
  const { getToken } = useToken();
  const [anggotaTim, setAnggotaTim] = useState<Mingguan[]>();
  const [posisi, setPosisi] = useState<Posisi[]>();

  const ambilPosisi = async () => {
    await api
      .get("/user/posisi", {
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
      .get("/user", {
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
    },
    {
      name: "Tugas Aktif",
      selector: (row) => row._count.user_tugas,
      cell: (row) => {
        return (
          <p className="font-bold text-primary">{row._count.user_tugas}</p>
        );
      },
    },
    {
    name: "Aksi",
    cell: (row) => (
      <button
        onClick={() => console.log(row.id)}
        className="cursor-pointer text-white px-3 py-1 rounded"
      >
        <img src="/assets/icons/trash.svg" className="hover:w-4 transition-all w-3" alt="hapus" />
      </button>
    ),
    ignoreRowClick: true,
  },
  ];

  useEffect(() => {
    ambilPosisi();
  }, []);

  return (
    <div className="relative flex flex-col gap-5 w-full h-full font-poppins">
      <div className="absolute bottom-0 right-0 cursor-pointer flex bg-primary-200 border-2 border-primary py-3 px-4 rounded-4xl flex-row gap-3">
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
      <div className="flex flex-row gap-2 h-50">
        {posisi?.map((posisi) => {
          return (
            <div
              key={posisi.id}
              className="flex flex-col flex-1  bg-white  rounded-lg  border-2 border-black"
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
