export interface Bulanan extends User{
  bulan: number,
  tahun: number,
  user_tugas: Tugas[]
}

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
  user_tugas: User[];
  file: Files[]
}

export interface Files{
  id: string;
  nama: string;
  nama_file: string;
  url: string;
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
