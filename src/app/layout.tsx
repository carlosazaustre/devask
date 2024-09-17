import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/styles/globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "DevAsk",
  description: "Get answers, Share knowledge, Grow together",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="flex flex-col min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 font-sans"
        style={{ letterSpacing: "-0.02em" }}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
