export interface Surah {
  nomor: number;
  nama: string;
  nama_latin: string;
  jumlah_ayat: number;
  tempat_turun: string;
  arti: string;
  deskripsi: string;
  audio: string;
}

export interface Ayah {
  id: number;
  surah: number;
  nomor: number;
  ar: string;
  tr: string;
  idn: string;
}

export interface SurahDetail extends Omit<Surah, 'nomor'> {
  status: boolean;
  nomor: number;
  ayat: Ayah[];
  surat_selanjutnya: Surah | false;
  surat_sebelumnya: Surah | false;
}
