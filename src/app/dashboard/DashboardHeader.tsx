"use client";
import { useEffect, useState } from "react";
import { fetchProductsCount, fetchUsersCount,fetchOrders } from "../../../utility/dasboardApi";
import StatCard from "../components/Dashboard/StatCard";
import Link from "next/link";

export default function DashboardHeader() {
  const [productCount, setProductCount] = useState<number>(0);
  const [userCount, setUserCount] = useState<number>(0);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [products, users, ordersData] = await Promise.all([
        fetchProductsCount(),
        fetchUsersCount(),
        fetchOrders(),
      ]);
      setProductCount(products);
      setUserCount(users);
      setOrders(ordersData);
    }
    loadData();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-semibold mb-6">Welcome, Admin</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link href="/dashboard/manage-products">
          <StatCard title="Total Products" value={productCount} className="bg-primary text-white" />
        </Link>
        <Link href="/dashboard/orders">
          <StatCard title="Orders" value={orders?.length || 0} className="bg-green-600 text-white" />
        </Link>
        <StatCard title="Users" value={userCount} className="bg-yellow-400 text-black" />
      </div>
    </>
  );
}
