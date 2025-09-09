
import { getProducts } from './NewProduct';
import ProductCard from './NewProductCard';

const NewProducts = async () => {
  const products = await getProducts();

  return (
    <section aria-labelledby="new-products-heading">
      <div className="py-3">
        <h1 id="new-products-heading" className="font-arial text-xl font-bold mb-2">New Products</h1>
        <hr className="border-t-3 dark:bg-white border-gray-300" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default NewProducts;
