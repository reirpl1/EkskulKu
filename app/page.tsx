import Link from "next/link";
import { ekskul } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul";

export default function Beranda() {
  const unggulan = ekskul.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-6 pb-12">
      <section className="py-12 text-center">
        <h1 className="text-4xl font-bold text-slate-900">
          Temukan ekskul seru di sekolahmu
        </h1>
        <p className="mt-3 text-slate-600">
          Olahraga, seni, sains, hingga teknologi. Daftarkan dirimu sekarang di
          sini.
        </p>
        <Link
          href="/ekskul"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white hover:bg-blue-700 transition"
        >
          Lihat semua ekskul
        </Link>
      </section>

      <h2 className="mb-4 text-xl font-semibold text-slate-800">
        Ekskul pilihan
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {unggulan.map((item) => (
          <KartuEkskul key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
