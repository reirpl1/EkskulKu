"use client";

export default function ErrorEkskul({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
      <h2 className="text-lg font-bold text-red-700">Terjadi Kesalahan</h2>
      <p className="mt-2 text-sm text-red-600">{error.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 rounded bg-red-600 px-4 py-2 text-white font-semibold hover:bg-red-700"
      >
        Coba lagi
      </button>
    </div>
  );
}
