import { useProducts } from "../context/ProductContext";
import { ProductCard } from "./ProductCard";

export function ProductList() {
  const { products, loading, error } = useProducts();
  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <div className="error">❌ {error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
