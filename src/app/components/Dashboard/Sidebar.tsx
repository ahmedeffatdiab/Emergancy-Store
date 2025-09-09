"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Dashboard", href: "/dashboard" },
  { name: "Add Products", href: "/dashboard/add-product" },
  { name: "Manage Products", href: "/dashboard/manage-products" },
  { name: "Orders", href: "/dashboard/orders" },
];

export default function Sidebar() {
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem("userToken");
    sessionStorage.clear();
    router.push("/login");
  };

  return (
    <aside className="w-64 h-screen fixed top-0 left-0 bg-black text-white p-4 shadow-lg">
      <h4 className="text-center mb-6 text-lg font-bold">Admin Panel</h4>
      <nav className="flex flex-col space-y-3">
        {navLinks.map((link) => (
          <Link  key={link.href} href={link.href} className="block hover:text-gray-300 transition-colors font-semibold hover:bg-gray-700 px-4 py-2 rounded-xl" >
            {link.name}
          </Link>
        ))}
        <button onClick={logout} className="text-left hover:text-gray-300 transition-colors font-semibold hover:bg-gray-700 px-4 py-2 rounded-xl" >
          Logout
        </button>
      </nav>
    </aside>
  );
}
