import {
  ShoppingCart,
  Truck,
  CreditCard,
  RotateCcw,
} from 'lucide-react';
import { ReactNode } from 'react';
interface Service {
  icon: ReactNode;
  title: string;
  description: string;
}

const services: Service[] = [
  {
    icon: <ShoppingCart className="w-8 h-8 text-blue-600 mx-auto" />,
    title: 'Online Shopping',
    description: 'Shop from the comfort of your home with a seamless and secure online experience.',
  },
  {
    icon: <Truck className="w-8 h-8 text-blue-600 mx-auto" />,
    title: 'Fast Delivery (24–72 Hours)',
    description: 'We deliver your order quickly within 1 to 3 working days across the country.',
  },
  {
    icon: <CreditCard className="w-8 h-8 text-blue-600 mx-auto" />,
    title: 'Online Payment',
    description: 'We offer safe online payment options, including cards and digital wallets.',
  },
  {
    icon: <RotateCcw className="w-8 h-8 text-blue-600 mx-auto" />,
    title: '14-Day Exchange & Return',
    description: 'You can exchange or return your product within 14 days of delivery — hassle-free.',
  },
];

const Services = () => {
  return (
    <section aria-labelledby="services-heading">
    
      <div className="py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h4 className="text-2xl font-semibold mb-2">Our Services</h4>
            <p className="text-gray-500 dark:text-gray-200">
              Enjoy convenient shopping with fast delivery, easy returns, and secure payment.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white shadow-sm p-6 text-center rounded-md hover:shadow-md transition"
              >
                <div className="mb-4">{service.icon}</div>
                <h5 className="text-lg text-gray-900  font-semibold mb-2">{service.title}</h5>
                <p className="text-gray-500 text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
