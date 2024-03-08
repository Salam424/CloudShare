import { Outfit } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Cloud Share",
  description: "You can share files with your friends without authentication",
};

export default function RootLayout({ children }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/weblogo.png" />
      </Head>
      <html lang="en">
        <body className={outfit.className}>{children}</body>
      </html>
    </>
  );
}
