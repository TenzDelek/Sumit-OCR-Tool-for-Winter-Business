import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SumIT:OCR for Winter Business",
  description: "Image to Text generator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className="lg:w-[720px] md:w-[520px] w-[380px] m-auto  px-2  flex flex-col justify-between">
        {children}
      </div>
        </body>
    </html>
  );
}
