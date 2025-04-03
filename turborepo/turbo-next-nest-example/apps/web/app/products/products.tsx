import { Product } from "@repo/types";

export default async function ProductsPage() {
  const response = await fetch(`${process.env.API_URL}/products`, {
    next: { tags: ["products"] },
  });
  const products: Product[] = await response.json();
  return (
    <main>
      <h1>Products</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <p>Name:{product.name}</p>
            <p>Price:{product.price}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
