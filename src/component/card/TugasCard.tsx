import Deadline from "./Deadline";
import Kuantitas from "./Kuantitas";

interface TugasProps {
  index: number;
  judul: string;
  kuantitas: number;
  deadline: string;
  user: number;
  onClick: () => void;
  admin: boolean;
  onDelete?: () => void;
  onEdit?: () => void;
}

function TugasCard({
  index,
  judul,
  kuantitas,
  deadline,
  user,
  onClick,
  admin,
  onDelete,
  onEdit,
}: TugasProps) {
  return (
    <div
      onClick={onClick}
      key={index}
      className="font-bold transition-all w-full bg-white cursor-pointer  flex flex-col gap-3 p-5 text-lg  rounded-lg border-2"
    >
      <p>{judul}</p>
      <div className="flex flex-row gap-2 font-medium text-sm">
        <Kuantitas kuantitas={kuantitas} />
        <Deadline deadline={deadline} />
      </div>
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center font-medium text-sm gap-2">
          <img src="/assets/icons/user.svg" width={15} alt="user" />
          <p>{user}</p>
        </div>
        {admin ? (
          <div className="flex flex-row gap-3 cursor-pointer">
            <img
              onClick={(e)=>{
                e.stopPropagation()
                onEdit?.()
              }}
              src="/assets/icons/edit.svg"
              className="hover:scale-125 transition-all"
              width={15}
              alt="edit"
            />
            <img
              onClick={(e)=>{
                e.stopPropagation()
                onDelete?.()
              }}
              src="/assets/icons/trash.svg"
              className="hover:scale-125 transition-all"
              width={15}
              alt="hapus"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TugasCard;
