import CheckoutFormComponent from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="max-w-3xl mx-auto py-8 shadow-md p-5 my-5 border ">
      <h1 className="text-2xl font-bold mb-2">Billing Details</h1>
      <CheckoutFormComponent  />
    </div>
  );
}