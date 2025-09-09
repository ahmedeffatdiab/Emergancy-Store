"use client";

import { usePathname } from "next/navigation";
import Header from "./Navigation/Header";
import Footer from "./Footer/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideLayoutForPaths = ["/dashboard"];
  const shouldHideLayout = hideLayoutForPaths.some((path) => pathname.startsWith(path));

  return (
    <main>
      {!shouldHideLayout && <Header />}
      {children}
      {!shouldHideLayout && <Footer />}
    </main>
  );
}
