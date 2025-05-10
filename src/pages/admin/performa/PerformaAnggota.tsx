import { useEffect, useState } from "react";
import Navbar from "../../../component/Navbar";
import axios from "axios";
import { useToken } from "../../../utils/Cookies";
import { Performa } from "../../../models/task/task";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";

function PerformaAnggota() {
  const { getToken } = useToken();
  const [anggotaTim, setAnggotaTim] = useState<Performa[]>();
  const navigate = useNavigate();

  const getAnggotaTim = async () => {
    await axios
      .post(
        import.meta.env.VITE_BASE_URL + "/user/bulanan",
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
  }, []);

  const columns: TableColumn<Performa>[] = [
    {
      name: "Nama",
      selector: (row) => row.nama,
    },
    {
      name: "Performa",
      selector: (row) => row.penilaian,
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
        <div className="flex-1 flex flex-row items-center justify-between px-5 rounded-lg h-15 bg-primary">
          <p>Copy Writer</p>
          <img src="/assets/icons/writer.svg" width={20} alt="writer" />
        </div>
        <div className="flex-1 rounded-lg text-primary  flex flex-row items-center justify-between px-5 h-15 bg-primary-200">
          <p>Desain Grafis</p>
          <img src="/assets/icons/image.svg" width={20} alt="image" />
        </div>
        <div className="flex-1 rounded-lg  flex flex-row items-center justify-between px-5 h-15 bg-primary">
          <p>Video Editor</p>
          <img src="/assets/icons/video.svg" width={20} alt="video" />
        </div>
      </div>
      <div className="flex flex-row gap-2 h-50">
        <div className="flex flex-col flex-1 bg-white rounded-lg border-2 border-black">
          <DataTable
            highlightOnHover
            theme="tables"
            columns={columns}
            data={
              anggotaTim
                ? anggotaTim?.filter((data) => data.posisi == "writer")!
                : []
            }
          />
        </div>
        <div className="flex flex-col flex-1  bg-white  rounded-lg  border-2 border-black">
          <DataTable
            highlightOnHover
            theme="tables"
            columns={columns}
            data={
              anggotaTim
                ? anggotaTim?.filter((data) => data.posisi == "image")!
                : []
            }
          />
        </div>
        <div className="flex flex-col flex-1  bg-white  rounded-lg  border-2 border-black">
          <DataTable
            highlightOnHover
            onRowClicked={(data)=>navigate('/admin/performa/anggota/' + data.id)}
            theme="tables"
            columns={columns}
            data={
              anggotaTim
                ? anggotaTim?.filter((data) => data.posisi == "video")!
                : []
            }
          />
        </div>
      </div>
    </div>
  );
}

export default PerformaAnggota;
