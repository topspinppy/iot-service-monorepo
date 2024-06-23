import { AuthProvider } from "@/provider/AuthProvider";
import SnackbarProvider from "@/provider/NotiStackProvider";
import QueryClientProvider from "@/provider/QueryClientProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IOT Dashboard management",
  description: "",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProvider >
          <QueryClientProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </QueryClientProvider>
        </SnackbarProvider>
      </body>
    </html>
  );
}
