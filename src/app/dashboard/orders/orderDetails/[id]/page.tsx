'use client'
import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import api from '@/lib/axios'

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface SubOrder {
  sessionId: string;
  status: string;
  isPaid: boolean;
  deliveredAt: string | null;
  products: Product[];
}

interface OrderInfo {
  _id: string;
  userId: string;
  Information: {
    First_name: string;
    Last_name: string;
    Email: string;
    Phone: string;
    country: string;
    Address: string;
    PostCode_ZIP: string;
  };
  orders: SubOrder[];
}

const OrderDetailsPage = () => {
  const { id } = useParams()
  const router = useRouter()
  const [orderData, setOrderData] = useState<OrderInfo | null>(null)
  const [loading, setLoading] = useState(true)

  const token = typeof window !== 'undefined' ? localStorage.getItem('userToken') : null

  useEffect(() => {
    if (!token) {
      router.push('/login')
    } else {
      fetchOrder()
    }
    async function fetchOrder() {
      try {
        const response = await api.get(`/orderDetailsNumber/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        setOrderData(response.data.data)
      } catch (error) {
        console.error('Failed to fetch order details:', error)
      } finally {
        setLoading(false)
      }
    }
  }, [id])

    if (loading) {
        return (
        <div className="p-6 space-y-4">
            <p>Loading....</p>
        </div>
        )
    }
  if (!orderData) {
    return (
      <div className="text-center py-20 text-muted-foreground">
        <h4 className="text-lg font-medium">No orders found</h4>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <h3 className="text-2xl font-semibold mb-6">Order Information</h3>
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-md p-0 h-12 flex items-center px-4">
            <h4 className="text-xl font-semibold">Order Details</h4>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h5 className="text-muted-foreground mb-2 font-medium">General Info</h5>
            <p><strong>Order ID:</strong> {orderData._id}</p>
            <p><strong>User ID:</strong> {orderData.userId}</p>
          </div>
          <div>
            <h5 className="text-muted-foreground mb-2 font-medium">Customer Information</h5>
            <ul className="divide-y rounded-md">
                {[
                    ['Name:', `${orderData.Information.First_name} ${orderData.Information.Last_name}`],
                    ['Email:', orderData.Information.Email],
                    ['Phone:', orderData.Information.Phone],
                    ['Country:', orderData.Information.country],
                    ['Address:', orderData.Information.Address],
                    ['Postal Code:', orderData.Information.PostCode_ZIP]
                ].map(([label, value], index, arr) => (
                    <li
                    key={label}
                    className={`px-3 py-2 ${index === 0 ? 'pt-0' : ''} ${
                        index === arr.length - 1 ? 'pb-0' : ''
                    }`}
                    >
                    <strong>{label}</strong> {value}
                    </li>
                ))}
            </ul>
          </div>
          {orderData.orders.map((subOrder, idx) => (
            <div key={idx} className="border-t pt-6 space-y-4">
              <h5 className="text-muted-foreground font-medium">Order Session #{idx + 1}</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <p className="break-all">
                    <strong>Session ID:</strong>{' '}
                    <span className="inline-block">
                        {subOrder.sessionId}
                    </span>
                    </p>
                    <p>
                    <strong>Status:</strong>{' '}
                    <Badge variant={
                        subOrder.status === 'pending' ? 'outline' :
                        subOrder.status === 'shipped' ? 'secondary' :
                        subOrder.status === 'delivered' ? 'default' : 
                        'destructive'
                    } className="uppercase px-2 py-1 text-xs">
                      {subOrder.status}
                    </Badge>        
                    </p>
                </div>
                <div>
                  <p><strong>Paid:</strong> {subOrder.isPaid ? '✅ Yes' : '❌ No'}</p>
                  <p><strong>Delivered At:</strong> {subOrder.deliveredAt ? new Date(subOrder.deliveredAt).toLocaleString() : 'Not delivered yet'}</p>
                </div>
              </div>
              <div>
                <h6 className="font-medium mt-4 mb-2">Products</h6>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Product Name</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Quantity</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {subOrder.products.map((prod, prodIdx) => (
                      <TableRow key={prod.id}>
                        <TableCell>{prodIdx + 1}</TableCell>
                        <TableCell>{prod.name}</TableCell>
                        <TableCell>${prod.price.toFixed(2)}</TableCell>
                        <TableCell>{prod.quantity}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

export default OrderDetailsPage
