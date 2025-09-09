import ProductTable from "./ProductTable";

export default async function DashboardPage() {

  return (
    <main className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Products</h1>
      <ProductTable  />
    </main>
  );
}
