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