import { JAM_SESI, pendaftar } from "@/data/ekskul";

export default function DetailEkskulCard({ ekskul }: { ekskul: any }) {
  const jumlahPendaftar = pendaftar.filter(
    (p) => p.ekskulId === ekskul.id,
  ).length;
  const sisaTempat = ekskul.kuota - jumlahPendaftar;
  const penuh = sisaTempat <= 0;

  return (
    <article className="mt-4 rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700">
          {ekskul.kategori}
        </span>
        {penuh ? (
          <span className="rounded bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
            Penuh
          </span>
        ) : (
          <span className="text-xs text-slate-500">
            Sisa {sisaTempat} dari {ekskul.kuota} tempat
          </span>
        )}
      </div>

      <h1 className="mt-3 text-3xl font-bold text-slate-900">{ekskul.nama}</h1>
      <p className="mt-1 text-sm text-slate-500">
        Jadwal: {ekskul.hari}, {JAM_SESI[ekskul.sesi] || `Sesi ${ekskul.sesi}`}
      </p>

      <div className="mt-4 pt-4 border-t text-sm text-slate-600">
        Pembina:{" "}
        <span className="font-medium text-slate-700">{ekskul.pembina}</span>
      </div>
    </article>
  );
}
