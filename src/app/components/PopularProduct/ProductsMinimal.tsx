import { getMinimalProducts } from './getMinimalProducts';
import CategorySection from './CategorySection';

type CategoryKey = 'clothes' | 'shoes' | 'accessories';

const ProductsMinimal = async () => {
  const data = await getMinimalProducts();

  const categories: { key: CategoryKey; label: string }[] = [
    { key: 'clothes', label: 'Clothes' },
    { key: 'shoes', label: 'Shoes' },
    { key: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {categories.map(({ key, label }) => (
        <CategorySection
          key={key}
          title={label}
          products={data[key]}
          loading={false} 
        />
      ))}
    </div>
  );
};

export default ProductsMinimal;
