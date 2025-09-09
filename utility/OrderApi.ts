import api from "@/lib/axios";

export async function fetchOrders(token: string) {
  const res = await api.get('/getOrders', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
}

export async function updateOrderStatus(orderId: string, orderIndex: string, newStatus: string) {
  return api.put(`/orders/${orderId}/status`, {
    orderIndex,
    newStatus,
  });
}
