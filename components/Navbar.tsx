"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", teks: "Beranda" },
  { href: "/ekskul", teks: "Daftar Ekskul" },
  { href: "/saya", teks: "Ekskul Saya" }, // ✨ Menu baru untuk Langkah 5
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-6 border-b bg-white px-6 py-3 shadow-sm">
      <span className="text-lg font-bold text-blue-600">EkskulKu</span>
      <div className="flex items-center gap-6">
        {menu.map((m) => {
          const isActive =
            m.href === "/" ? pathname === "/" : pathname.startsWith(m.href);

          return (
            <Link
              key={m.href}
              href={m.href}
              className={
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-slate-600 hover:text-blue-600 transition"
              }
            >
              {m.teks}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
