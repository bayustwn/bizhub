interface PayloadItem {
  value: number | string;
}

interface Tooltips {
  active?: boolean;
  payload?: PayloadItem[];
}

const CustomTooltip = ({ active, payload }: Tooltips) => {
  if (active && payload && payload.length) {
    return (
      <div className="border-1 border-primary-200 bg-white p-2 rounded-lg">
        <p className="text-primary text-sm font-bold">
          {payload[0].value} Tugas
        </p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;