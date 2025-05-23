import { StatusModel } from "../../models/task/status";

function Status({status,value,style}:StatusModel) {
  return (
    <div className={`${style} border-2 bg-white flex flex-row justify-between items-center px-5 py-3 text-black font-bold rounded-lg`}>
      <p>{status}</p>
      <div className="bg-primary-200 text-primary px-4 rounded-sm">
        <p>{value}</p>
      </div>
    </div>
  );
}

export default Status;