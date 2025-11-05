import { formatDate } from "../../utils/DateFormat";

interface PayloadItem {
  value: number | string;
  payload: {
    tanggal: string;
    nilai: number;
  };
}

interface Tooltips {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomTooltip = ({ active, payload }: Tooltips) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="border-1 border-primary-200 bg-white p-2 rounded-lg">
        <p className="text-primary text-sm font-bold">
          {data.nilai} Tugas
        </p>
        {data.tanggal? <p className="font-medium text-sm mt-2">{formatDate(data.tanggal)}</p> : "" }
      </div>
    );
  }

  return null;
};

export default CustomTooltip;