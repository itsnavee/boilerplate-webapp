import type { Metadata } from "next";
import { Inter, Roboto, Open_Sans } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/lib/theme-context";
import { PageHeaderProvider } from "@/lib/page-header-context";
import { StudioLayout } from "@/components/layout/studio-layout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-roboto" });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-open-sans" });

export const metadata: Metadata = {
  title: "Aerwave Studio",
  description: "AI Voice Calling Platform - Tenant Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${roboto.variable} ${openSans.variable}`}>
        <ThemeProvider>
          <PageHeaderProvider>
            <StudioLayout>
              {children}
            </StudioLayout>
          </PageHeaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
