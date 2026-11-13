import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { ambilEkskul, ambilAnggota } from "@/data/ambil";
import FormPendaftaran from "./FormPendaftaran";
import DetailEkskulCard from "@/components/DetailEkskulCard"; // Memanggil komponen card dari folder components

export const instant = false;

// Mengatur Judul Tab Dinamis
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));

  if (!ekskul) {
    return { title: "Ekskul tidak ditemukan" };
  }

  return { title: ekskul.nama };
}

// Komponen Daftar Anggota Terdaftar (Dibungkus Suspense)
async function DaftarAnggotaContainer({ ekskulId }: { ekskulId: number }) {
  const anggotaList = await ambilAnggota(ekskulId);
  const cookieStore = await cookies();
  const namaUserCookie = cookieStore.get("nama_user")?.value || "";

  const totalPendaftar = anggotaList.length;

  return (
    <div className="mt-8 rounded-xl border bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-slate-800">
        Anggota Terdaftar ({totalPendaftar} tempat terisi)
      </h3>

      {anggotaList.length === 0 ? (
        <p className="mt-3 text-sm text-slate-500">Belum ada anggota.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-100">
          {anggotaList.map((p) => {
            const isKamu =
              p.nama.toLowerCase() === namaUserCookie.toLowerCase();
            return (
              <li
                key={p.nomor}
                className="py-3 flex items-center justify-between text-sm"
              >
                <div>
                  <span className="font-medium text-slate-800">{p.nama}</span>
                  <span className="ml-2 text-xs text-slate-500">
                    ({p.kelas})
                  </span>
                </div>
                {isKamu && (
                  <span className="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-700">
                    Kamu
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

// Halaman Utama Detail Ekskul
export default async function HalamanDetailEkskul({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const ekskul = await ambilEkskul(Number(id));

  if (!ekskul) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      <Link
        href="/ekskul"
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        ← Kembali ke Daftar Ekskul
      </Link>

      {/* Memanggil Komponen Kartu Detail Ekskul */}
      <DetailEkskulCard ekskul={ekskul} />

      {/* Formulir Pendaftaran */}
      <FormPendaftaran ekskulId={ekskul.id} />

      {/* Bagian Anggota yang Dibungkus Suspense */}
      <Suspense
        fallback={
          <div className="mt-8 rounded-xl border bg-white p-6 text-sm text-slate-500 animate-pulse">
            Memuat anggota...
          </div>
        }
      >
        <DaftarAnggotaContainer ekskulId={ekskul.id} />
      </Suspense>
    </div>
  );
}
