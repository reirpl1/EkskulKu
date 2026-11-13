import Link from "next/link";
import { JAM_SESI, pendaftar } from "@/data/ekskul";

export default function KartuEkskul({ item }: { item: any }) {
  const jumlahPendaftar = pendaftar.filter(
    (p) => p.ekskulId === item.id,
  ).length;
  const sisaTempat = item.kuota - jumlahPendaftar;
  const penuh = sisaTempat <= 0;

  return (
    <Link
      href={`/ekskul/${item.id}`}
      className="flex flex-col justify-between rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
            {item.kategori}
          </span>
          {penuh ? (
            <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
              Penuh
            </span>
          ) : (
            <span className="text-xs text-slate-500">
              Sisa {sisaTempat} dari {item.kuota} tempat
            </span>
          )}
        </div>
        <h2 className="mt-3 text-xl font-semibold text-slate-800">
          {item.nama}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {item.hari}, {JAM_SESI[item.sesi] || `Sesi ${item.sesi}`}
        </p>
      </div>
      <div className="mt-4 pt-3 border-t text-sm text-slate-600">
        Pembina:{" "}
        <span className="font-medium text-slate-700">{item.pembina}</span>
      </div>
    </Link>
  );
}
