"use client";

import { useActionState } from "react";
import { daftarEkskulAction } from "./actions";

export default function FormPendaftaran({ ekskulId }: { ekskulId: number }) {
  const [state, formAction, isPending] = useActionState(
    daftarEkskulAction,
    null,
  );

  return (
    <form
      action={formAction}
      className="mt-8 rounded-xl border bg-white p-6 shadow-sm"
    >
      <h3 className="text-lg font-semibold text-slate-800">
        Daftar Ekskul Ini
      </h3>
      <input type="hidden" name="ekskulId" value={ekskulId} />

      {/* SATU KOTAK NOTIFIKASI UTAMA (Menangani Berhasil & Gagal sekaligus) */}
      {state?.message && (
        <div
          className={`mt-4 rounded-lg p-3 text-sm border ${
            state.success
              ? "bg-green-50 text-green-700 border-green-200"
              : "bg-red-50 text-red-600 border-red-200"
          }`}
        >
          {state.message}
        </div>
      )}

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">Nama</label>
        <input
          type="text"
          name="nama"
          defaultValue={state?.inputs?.nama || ""}
          className="mt-1 w-full rounded-md border p-2 text-sm"
          placeholder="Contoh: Rudi"
        />
        {state?.errors?.nama && (
          <p className="mt-1 text-xs text-red-500">{state.errors.nama}</p>
        )}
      </div>

      <div className="mt-4">
        <label className="block text-sm font-medium text-slate-700">
          Kelas
        </label>
        <input
          type="text"
          name="kelas"
          defaultValue={state?.inputs?.kelas || ""}
          className="mt-1 w-full rounded-md border p-2 text-sm"
          placeholder="Contoh: XI TKJ 1"
        />
        {state?.errors?.kelas && (
          <p className="mt-1 text-xs text-red-500">{state.errors.kelas}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-md bg-blue-600 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:bg-slate-400"
      >
        {isPending ? "Memproses..." : "Daftar Sekarang"}
      </button>
    </form>
  );
}
