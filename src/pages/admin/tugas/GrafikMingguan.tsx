import { Tugas } from "../../../models/task/task";

type DataGrafik = {
  tanggal: string;
  nilai: number; 
};

function getLastNDays(n: number): string[] {
  const result: string[] = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    result.push(date.toISOString().split("T")[0]); 
  }
  return result;
}

function grafikMingguan(data: Tugas[], days = 7): DataGrafik[] {
  const lastNDays = getLastNDays(days);
  const map = new Map<string, number>();

  for (const tanggal of lastNDays) {
    map.set(tanggal, 0);
  }

  for (const item of data) {
    const tanggal = new Date(item.tanggal_dibuat || "").toISOString().split("T")[0];
    if (map.has(tanggal)) {
      map.set(tanggal, (map.get(tanggal) || 0) + 1);
    }
  }

  return lastNDays.map(tanggal => ({
    tanggal,
    nilai: map.get(tanggal) || 0
  }));
}

export default grafikMingguan;