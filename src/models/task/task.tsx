export interface Tugas {
  id: string;
  brief: string;
  deadline: string;
  id_admin: string;
  judul: string;
  kuantitas: number;
  status: string;
  tanggal_dibuat?: Date;
  tanggal_diubah?: Date;
  terlambat: boolean;
}

export interface User {
  id: string;
  nama: string;
  email: string;
  posisi: string;
}

export interface Mingguan extends User {
  _count: {
    user_tugas: number;
  };
}

export interface Performa {
  id: string;
  nama: string;
  email: string;
  posisi: string;
  jumlah_tugas: number;
  jumlah_terlambat: number;
  penilaian: string;
}
