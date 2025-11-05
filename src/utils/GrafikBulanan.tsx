import { Tugas } from "../models/task/task";

type DataGrafik = {
  minggu: string;
  nilai: number;
};

function grafikBulanan(data: Tugas[], month: number, year: number): DataGrafik[] {
  const weeks = [0, 0, 0, 0]; 

  for (const item of data) {
    const tanggal = new Date(item.tanggal_dibuat || "");

    const itemMonth = tanggal.getMonth(); 
    const itemYear = tanggal.getFullYear();

    if (itemMonth === month - 1 && itemYear === year) {
      const day = tanggal.getDate();

      let weekIndex = 0;
      if (day <= 7) weekIndex = 0;          
      else if (day <= 14) weekIndex = 1;    
      else if (day <= 21) weekIndex = 2;    
      else weekIndex = 3;                   

      weeks[weekIndex]++;
    }
  }

  return weeks.map((nilai, index) => ({
    minggu: `Minggu ${index + 1}`,
    nilai,
  }));
}

export default grafikBulanan;