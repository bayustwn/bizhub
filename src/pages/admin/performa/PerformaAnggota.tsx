import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import api from "../../../utils/Api";
import { useToken } from "../../../utils/Cookies";
import { Performa } from "../../../models/task/task";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";
import { Posisi } from "../../../models/posisi";

function PerformaAnggota() {
  const { getToken } = useToken();
  const [anggotaTim, setAnggotaTim] = useState<Performa[]>();
  const navigate = useNavigate();
  const [posisi,setPosisi] = useState<Posisi[]>()

  const ambilPosisi = async() => {
    await api.get("/pengguna/posisi",{
      headers : {
        Authorization : "Bearer " + getToken()
      }
    }).then(res=>{
      setPosisi(res.data.data)
    })
  }

  const getAnggotaTim = async () => {
    await api
      .post("/pengguna/bulanan",
        { bulan: 5, tahun: 2025 },
        {
          headers: {
            Authorization: "Bearer " + getToken(),
          },
        }
      )
      .then((res) => {
        setAnggotaTim(res.data.data);
      });
  };

  useEffect(() => {
    getAnggotaTim();
    ambilPosisi()
  }, []);

  const columns: TableColumn<Performa>[] = [
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Performa",
      selector: (row) => row.penilaian,
      center: true,
      cell: (row) => {
        switch (row.penilaian) {
          case "Baik":
            return (
              <div className="px-5 font-medium py-1 rounded-md w-28 text-center text-white bg-green">
                <p>{row.penilaian}</p>
              </div>
            );
          case "Kurang":
            return (
              <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-black bg-yellow">
                <p>{row.penilaian}</p>
              </div>
            );

          case "Buruk":
            return (
              <div className="px-5 font-medium py-1  rounded-md w-28 text-center text-white bg-red">
                <p>{row.penilaian}</p>
              </div>
            );
        }
      },
    },
  ];

  return (
    <div className="flex flex-col gap-5 w-full font-poppins">
      <Navbar title="Performa Anggota Tim" />
      <div className="flex flex-row text-white font-medium gap-2 mt-8">
        {posisi?.map((posisi,index)=>{
          return (
            <div key={posisi.id} className={`flex-1 flex flex-row items-center justify-between px-5 rounded-lg h-15 ${index % 2 == 0? "bg-primary text-white" : "bg-primary-200 text-primary"} `}>
          <p>{posisi.posisi}</p>
        </div>
          )
        })}
      </div>
      <div className="flex flex-row gap-2 h-50">
        {posisi?.map((posisi)=>{
          return(
            <div key={posisi.id} className="flex flex-col flex-1  bg-white  rounded-lg  border-2 border-black">
          <DataTable
            highlightOnHover
            theme="tables"
            pointerOnHover
            onRowClicked={(data)=>navigate('/admin/performa/anggota/' + data.id)}
            columns={columns}
            data={
              anggotaTim
                ? anggotaTim?.filter((data) => data.posisi == posisi.posisi)!
                : []
            }
          />
        </div>
          )
        })}
      </div>
    </div>
  );
}

export default PerformaAnggota;
