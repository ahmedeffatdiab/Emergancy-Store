import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "./ui/theme-provider";
import { AuthProvider } from "@/context/authContext";
import { CartProvider } from "@/context/CartContext";
import { PurchaseAlertProvider } from "@/context/PurchaseAlertContext";
import {LoveProvider} from "@/context/LoveContext"
import LayoutWrapper from "./components/LayoutWrapper";
import { Toaster } from "sonner";
import NetworkListener from "./components/NetworkListener";

export const metadata: Metadata = {
   title: "Emergancy Store ",
  description:
    "Shop the latest in fashion, sportswear, and accessories at Emergancy Store. Discover high-quality clothing for men, women, and kids – perfect for every lifestyle.",
  keywords: [
    "clothing store",
    "sportswear",
    "fashion accessories",
    "men's fashion",
    "women's clothing",
    "athletic wear",
    "online clothing store",
    "fitness apparel",
    "Emergancy Store",
  ],
  openGraph: {
    title: "Emergancy Store | Stylish Clothing & Sportswear for Everyone",
    description:
      "Find premium fashion and performance wear at Emergancy Store. From casual outfits to athletic gear – dress confidently every day.",
    url: "https://yourdomain.com", 
    siteName: "Emergancy Store",
    type: "website",
    images: [
      {
        url: "https://yourdomain.com/og-image.jpg", 
        width: 1200,
        height: 630,
        alt: "Emergancy Store - Clothing and Sportswear",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Emergancy Store | Clothing, Sportswear & Accessories",
    description:
      "Upgrade your wardrobe with our curated selection of clothing, fitness gear, and accessories. Fast shipping & quality you can trust.",
    images: ["https://yourdomain.com/og-image.jpg"], // Replace with actual image
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
              <LoveProvider>
                <PurchaseAlertProvider>
                  <NetworkListener/>
                  <LayoutWrapper>
                    {children}
                  </LayoutWrapper>
              </PurchaseAlertProvider>
              </LoveProvider>               
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
