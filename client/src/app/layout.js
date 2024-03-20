import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginProvider from "@/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SJEC Placement",
  description: "Placement Repository for SJEC Students",
};
<link rel="icon" href="/favicon.ico" sizes="any" />;

export default function RootLayout({ children }) {
  return (
    <LoginProvider>
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <div className="  bg-background-clr">{children}</div>
        <Footer />
      </body>
      </html>
      </LoginProvider>
  );
}
