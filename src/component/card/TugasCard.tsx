import Deadline from "./Deadline";
import Kuantitas from "./Kuantitas";

interface TugasProps {
  index: number;
  judul: string;
  kuantitas: number;
  deadline: string;
  user: number;
  onClick: ()=>void;
}

function TugasCard({ index, judul, kuantitas, deadline, user ,onClick}: TugasProps) {
  return (
    <div
      onClick={onClick}
      key={index}
      className="font-bold w-full bg-white cursor-pointer  flex flex-col gap-3 p-5 text-md  rounded-lg border-2"
    >
      <p>{judul}</p>
      <div className="flex flex-row gap-2 font-medium text-sm">
        <Kuantitas kuantitas={kuantitas}/>
        <Deadline deadline={deadline}/>
      </div>
      <div className="flex flex-row items-center font-medium text-sm gap-2">
        <img src="/assets/icons/user.svg" width={15} alt="user" />
        <p>{user}</p>
      </div>
    </div>
  );
}

export default TugasCard;
