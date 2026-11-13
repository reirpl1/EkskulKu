import { ambilSemuaEkskul } from "@/data/ambil";
import { DAFTAR_KATEGORI, DAFTAR_HARI } from "@/data/ekskul";
import KartuEkskul from "@/components/KartuEkskul"; // <-- Mengambil dari folder components

export const metadata = {
  title: "Daftar Ekskul",
};

export default async function HalamanEkskul({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; hari?: string }>;
}) {
  const params = await searchParams;
  const kategoriFilter = params.kategori;
  const hariFilter = params.hari;

  const semuaEkskul = await ambilSemuaEkskul();

  const listEkskul = semuaEkskul.filter((item) => {
    const cocokKategori =
      !kategoriFilter ||
      kategoriFilter === "Semua" ||
      item.kategori === kategoriFilter;
    const cocokHari =
      !hariFilter || hariFilter === "Semua" || item.hari === hariFilter;
    return cocokKategori && cocokHari;
  });

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Daftar Ekskul</h1>

      {/* Form Filter */}
      <form
        method="GET"
        className="mb-6 flex flex-wrap gap-4 rounded-xl border bg-white p-4 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Kategori
          </label>
          <select
            name="kategori"
            defaultValue={kategoriFilter || "Semua"}
            className="mt-1 rounded-md border p-2 text-sm"
          >
            <option value="Semua">Semua Kategori</option>
            {DAFTAR_KATEGORI.map((kat) => (
              <option key={kat} value={kat}>
                {kat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700">
            Hari
          </label>
          <select
            name="hari"
            defaultValue={hariFilter || "Semua"}
            className="mt-1 rounded-md border p-2 text-sm"
          >
            <option value="Semua">Semua Hari</option>
            {DAFTAR_HARI.map((h) => (
              <option key={h} value={h}>
                {h}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Saring
          </button>
        </div>
      </form>

      <p className="mb-4 text-sm text-slate-600">
        {listEkskul.length} ekskul ditemukan.
      </p>

      {listEkskul.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-slate-500">
          Tidak ada ekskul yang cocok.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {listEkskul.map((item) => (
            <KartuEkskul key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
