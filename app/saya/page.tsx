import { cookies } from "next/headers";
import Link from "next/link";
import { Suspense } from "react";
import { pendaftar, ekskul } from "@/data/ekskul";
import { batalkanPendaftaran } from "../actions/ekskul";

async function KontenEskulSaya() {
  const cookieStore = await cookies();
  const namaSiswa = cookieStore.get("nama_user")?.value;
  const kelasSiswa = cookieStore.get("kelas_user")?.value;

  // Kondisi 1: Tanpa cookie
  if (!namaSiswa || !kelasSiswa) {
    return (
      <p className="text-gray-700">
        Kamu belum mendaftar apa pun.{" "}
        <Link href="/ekskul" className="text-blue-600 underline font-medium">
          /ekskul
        </Link>
      </p>
    );
  }

  // Filter pendaftaran siswa berdasarkan nama dan kelas dari cookie
  const pendaftaranSaya = pendaftar.filter(
    (p) =>
      p.nama.toLowerCase() === namaSiswa.toLowerCase() &&
      p.kelas.toLowerCase() === kelasSiswa.toLowerCase(),
  );

  // Kondisi 2: Cookie ada, tapi belum daftar eskul apa pun
  if (!pendaftaranSaya || pendaftaranSaya.length === 0) {
    return (
      <>
        <p className="text-sm text-gray-500 mb-4">
          Ringkasan {namaSiswa} · {kelasSiswa}
        </p>
        <p className="text-gray-700">Belum ada eskul yang diikuti.</p>
      </>
    );
  }

  // Kondisi 3: Cookie ada dan ada eskul yang diikuti
  return (
    <>
      <p className="text-sm text-gray-600 mb-6 bg-gray-50 p-3 rounded-md border">
        Ringkasan {namaSiswa} · {kelasSiswa} · {pendaftaranSaya.length} eskul
        diikuti
      </p>

      <div className="space-y-4">
        {pendaftaranSaya.map((item) => {
          const detailEskul = ekskul.find((e) => e.id === item.ekskulId);
          if (!detailEskul) return null;

          const jamSesiTeks =
            detailEskul.sesi === 1 ? "15.00–16.30" : "16.30–18.00";

          return (
            <div
              key={item.ekskulId}
              className="p-4 border rounded-lg shadow-sm flex justify-between items-center bg-white"
            >
              <div>
                <Link
                  href={`/ekskul/${detailEskul.id}`}
                  className="font-semibold text-blue-600 hover:underline text-lg"
                >
                  {detailEskul.nama}
                </Link>
                <p className="text-sm text-gray-600 mt-1">
                  {detailEskul.hari}, Sesi {detailEskul.sesi} ({jamSesiTeks})
                </p>
              </div>

              <form action={batalkanPendaftaran}>
                <input type="hidden" name="ekskulId" value={item.ekskulId} />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition"
                >
                  Batalkan
                </button>
              </form>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default function HalamanEskulSaya() {
  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Eskul saya</h1>

      <Suspense fallback={<p className="text-gray-500">Memuat data...</p>}>
        <KontenEskulSaya />
      </Suspense>
    </main>
  );
}
