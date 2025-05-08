import { Tugas } from "../models/task/task";

export function filterRange(data:Tugas[], days: number): Tugas[] {

    if (!Array.isArray(data)) return [];

    const date = new Date();
    const fromDate = new Date();
    fromDate.setDate(date.getDate() - days);
  
    return data.filter(item => {
      const tanggal_dibuat = new Date(item.tanggal_dibuat!);
      return tanggal_dibuat >= fromDate && tanggal_dibuat <= date;
    });
  }