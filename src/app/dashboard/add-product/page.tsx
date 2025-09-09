import AddProductForm from "../../components/Dashboard/AddProductForm";

export default function AddProductPage() {
  return (
    <div className="p-6 w-3/4 shadow-gray-400 mx-auto rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <AddProductForm />
    </div>
  );
}
