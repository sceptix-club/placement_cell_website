import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Header2 from "@/components/Header2";
import { Toaster } from "sonner";
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
      {/* <RoleProvider> */}
      <html lang="en">
        <body className={inter.className}>
          {/* <Header /> */}
          <Header2 />
          <div className=" md:mb-24 mb-40 bg-background-clr">{children}</div>
          <Toaster richColors />
          <Footer />
        </body>
      </html>
      {/* </RoleProvider> */}
    </LoginProvider>
  );
}
