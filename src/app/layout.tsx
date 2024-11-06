import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SideBar from "@/components/SideBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Araqque",
  description: "Ödev Kontrol Sistemi0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <a href={'/'}>
          <h1 className="text-2xl font-extrabold p-3">Araqque</h1>
          </a>
          
        </header>
        <aside>
          <SideBar />
        </aside>
        <main>
      
          {children}
        </main>
       
        <footer>
          <div className="flex justify-start p-3">
            <div className="text-xs text-slate-600">
                Araqque, Tüm Hakalrı Saklıdır.
            </div>
          </div>
        </footer>
        
      </body>
    </html>
  );
}
