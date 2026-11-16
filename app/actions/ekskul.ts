"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { pendaftar } from "@/data/ekskul";

export async function batalkanPendaftaran(formData: FormData) {
  const cookieStore = await cookies();
  const namaSiswa = cookieStore.get("nama_user")?.value;
  const kelasSiswa = cookieStore.get("kelas_user")?.value;

  const ekskulIdStr = formData.get("ekskulId") as string;
  const ekskulId = Number(ekskulIdStr);

  if (!namaSiswa || !kelasSiswa) {
    throw new Error("Aksi ditolak: Identitas cookie tidak valid.");
  }

  // Cari index data pendaftar berdasarkan ekskulId, nama, dan kelas siswa
  const index = pendaftar.findIndex(
    (p) =>
      p.ekskulId === ekskulId &&
      p.nama.toLowerCase() === namaSiswa.toLowerCase() &&
      p.kelas.toLowerCase() === kelasSiswa.toLowerCase(),
  );

  if (index === -1) {
    throw new Error(
      "Aksi ditolak: Pendaftaran tidak ditemukan atau Anda tidak memiliki hak membatalkannya.",
    );
  }

  const targetPendaftaran = pendaftar[index];

  // Hapus data dari array
  pendaftar.splice(index, 1);

  // Revalidasi agar halaman langsung berubah instan
  revalidatePath("/saya");
  revalidatePath("/ekskul");
  revalidatePath(`/ekskul/${targetPendaftaran.ekskulId}`);
}
