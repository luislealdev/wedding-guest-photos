import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YAMILLY & JUAN CARLOS",
  description: "Acompáñanos en este día tan especial",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="https://luisrrleal.com/styles/leal-styles.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
