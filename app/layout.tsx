import type { Metadata } from "next";
import "../styles/globals.css";
import Providers from "../components/providers";

export const metadata: Metadata = {
  title: "Cars Rental",
  description: "Your sleek, smooth car rental experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
