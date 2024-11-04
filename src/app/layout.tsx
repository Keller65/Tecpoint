import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Distribuidores de Accesorios Tecnológicos | Tecpoint",
  description: "Distribuidor de accesorios tecnológicos en Honduras. Cargadores, adaptadores, audífonos, periféricos y más, al por mayor y al detalle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        {/* Favicon global */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        {/* <link rel="manifest" href="/site.webmanifest" /> */}
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}