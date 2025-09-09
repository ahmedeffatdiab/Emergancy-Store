"use client";
import { useEffect, useState, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { fetchOrders, updateOrderStatus } from "../../../../utility/OrderApi";

type OrderItem = {
  _id: string;
  isPaid: boolean;
  status: string;
};

type OrderGroup = {
  _id: string;
  Information: {
    Email: string;
  };
  orders: OrderItem[];
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderGroup[]>([]);
  const [isPending, startTransition] = useTransition();

  const token =
    typeof window !== "undefined" ? localStorage.getItem("userToken") || "" : "";

  const getOrders = async () => {
    if (!token) return;
    try {
      const data = await fetchOrders(token);
      setOrders(data);
    } catch (err) {
      console.error("Error loading orders:", err);
    }
  };

  const handleStatusChange = async (
    orderId: string,
    orderIndex: string,
    newStatus: string
  ) => {
    try {
      await updateOrderStatus(orderId, orderIndex, newStatus);
      getOrders();
    } catch (err) {
      alert("Failed to update order status.");
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Order Management</h1>
      <div className="overflow-x-auto">
        <table className="min-w-[800px] w-full border text-sm bg-white shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border">#</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Order-State</th>
              <th className="p-2 border">Product-State</th>
              <th className="p-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((user, index) =>
                user.orders.map((order) => (
                  <tr key={order._id} className="text-center border-t">
                    <td className="p-2 border">{index + 1}</td>
                    <td className="p-2 border text-blue-600 underline">
                      <a href={`/dashboard/orders/orderDetails/${user._id}`}>
                        {user.Information.Email}
                      </a>
                    </td>
                    <td className="p-2 border">
                      <Badge variant={order.isPaid ? "default" : "destructive"}>
                        {order.isPaid ? "Paid" : "Not Paid"}
                      </Badge>
                    </td>
                    <td className="p-2 border capitalize">
                      <Badge
                        variant={
                          order.status === "pending" ? "outline"
                            : order.status === "shipped" ? "secondary"
                            : order.status === "delivered" ? "default"
                            : "destructive"
                        }>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-2 border">
                      <select className="border rounded p-1 text-sm" value={order.status} onChange={(e) => startTransition(() =>
                            handleStatusChange(user._id, order._id, e.target.value)
                      )}>
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                      {isPending && <span className="text-xs text-gray-500">Updating...</span>}
                    </td>
                  </tr>
                ))
              )
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-red-600">
                  You have not bought any products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
