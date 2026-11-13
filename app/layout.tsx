import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar"; // Memanggil navbar dari folder components

export const metadata: Metadata = {
  title: "EkskulKu",
  description: "Aplikasi manajemen dan pendaftaran ekstrakurikuler sekolah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
