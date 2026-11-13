"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ekskul, pendaftar, tambahPendaftar } from "@/data/ekskul";
import { ambilEkskul } from "@/data/ambil";

export async function daftarEkskulAction(prevState: any, fromData: FormData) {
  const ekskulIdStr = fromData.get("ekskulId") as string;
  const nama = (fromData.get("nama") as string)?.trim();
  const kelas = (fromData.get("kelas") as string)?.trim();

  const ekskulId = Number(ekskulIdStr);
  const errors: Record<string, string> = {};

  // validasi kolom minimal 3 huruf / karakter ya
  if (!nama || nama.length < 3) {
    errors.nama = "Nama minimal 3 huruf.";
  }
  if (!kelas || kelas.length < 3) {
    errors.kelas = "Kelas minimal 3 karakter.";
  }
  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      inputs: { nama, kelas },
      message: "Mohon periksa kembali isian formulir Anda.",
    };
  }

  // 2. Cek apakah ID Ekskul valid
  const targetEkskul = await ambilEkskul(ekskulId);
  if (!targetEkskul) {
    return {
      success: false,
      inputs: { nama, kelas },
      message: "Ekskul tidak ditemukan.",
    };
  }

  // 3. Cek apakah sudah terdaftar di ekskul yang sama (case-insensitive)
  const sudahTerdaftarDiSini = pendaftar.some(
    (p) =>
      p.ekskulId === ekskulId &&
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase(),
  );

  if (sudahTerdaftarDiSini) {
    return {
      success: false,
      inputs: { nama, kelas },
      message: `${nama} (${kelas}) sudah terdaftar di ${targetEkskul.nama}.`,
    };
  }

  // 4. Cek Kuota Penuh
  const pendaftarEkskulIni = pendaftar.filter((p) => p.ekskulId === ekskulId);
  if (pendaftarEkskulIni.length >= targetEkskul.kuota) {
    return {
      success: false,
      inputs: { nama, kelas },
      message: `Kuota ${targetEkskul.nama} sudah penuh (${targetEkskul.kuota} orang).`,
    };
  }

  // 5. Cek Bentrok Jadwal (Hari dan Sesi yang sama dengan ekskul lain)
  const ekskulDiikutiMurid = pendaftar.filter(
    (p) =>
      p.nama.toLowerCase() === nama.toLowerCase() &&
      p.kelas.toLowerCase() === kelas.toLowerCase(),
  );

  for (const p of ekskulDiikutiMurid) {
    const eLain = ekskul.find((e) => e.id === p.ekskulId);
    if (
      eLain &&
      eLain.hari === targetEkskul.hari &&
      eLain.sesi === targetEkskul.sesi
    ) {
      return {
        success: false,
        inputs: { nama, kelas },
        message: `Jadwal bentrok dengan ${eLain.nama} (${eLain.hari}, sesi ${eLain.sesi}).`,
      };
    }
  }

  // 6. Proses Pendaftaran Berhasil
  const nomorBaru = tambahPendaftar({
    ekskulId,
    nama,
    kelas,
  });

  // Simpan identitas ke cookie
  const cookieStore = await cookies();
  cookieStore.set("nama_user", nama, { path: "/" });
  cookieStore.set("kelas_user", kelas, { path: "/" });

  // Revalidate agar halaman dan daftar ekskul langsung berubah tanpa F5
  revalidatePath(`/ekskul/${ekskulId}`);
  revalidatePath("/ekskul");

  const jamSesiTeks = targetEkskul.sesi === 1 ? "15.00–16.30" : "16.30–18.00";

  return {
    success: true,
    inputs: { nama: "", kelas: "" }, // Kosongkan form jika berhasil
    message: `Pendaftaran #${nomorBaru} berhasil: ${targetEkskul.nama}, ${targetEkskul.hari}, sesi ${targetEkskul.sesi} (${jamSesiTeks}).`,
  };
}
