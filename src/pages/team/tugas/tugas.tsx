import Navbar from "../../../component/Navbar";
import Status from "../../../component/status/Status";
import { StatusModel } from "../../../models/task/status";

function PenggunaTugas() {
  const status: StatusModel[] = [
    {
      status: "Dibuat",
      value: 5,
    },
    {
      status: "Dikerjakan",
      value: 5,
    },
    {
      status: "Ditinjau",
      value: 5,
    },
    {
      status: "Revisi",
      value: 5,
    },
    {
      status: "Selesai",
      value: 5,
    },
  ];

  return (
    <div className="flex flex-col font-poppins gap-2">
      <Navbar title="Semua Tugas" style="w-screen pr-10" />
      <div className="flex gap-5 w-screen flex-row mt-10 overflow-y-auto pr-10">
        {status.map((data, index) => {
          return (
            <div key={index} className="flex cursor-pointer flex-col gap-5 w-100">
              <Status status={data.status} value={data.value} />
              <div className="font-bold w-full flex flex-col gap-3 p-5 text-md  rounded-lg border-2">
                <p>Judul Tugas </p>
                <div className="flex flex-row gap-2 font-medium text-sm">
                  <div className="bg-primary-200 p-2 rounded-md flex flex-row gap-1 text-primary">
                    <img src="/assets/icons/task.svg" width={15} alt="tugas" />
                    <p>12</p>
                  </div>
                  <div>
                  <div className="bg-primary-200 p-2 rounded-md flex flex-row gap-1 text-primary">
                    <img src="/assets/icons/clock.svg" width={15} alt="tugas" />
                    <p>1 Jam 2 Menit</p>
                  </div>
                  </div>
                </div>
                <div className="flex flex-row items-center font-medium text-sm gap-2">
                <img src="/assets/icons/user.svg" width={15} alt="user" />
                <p>2+</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PenggunaTugas;
