import CreateProduct from "./create-product/create-product";
import ProductsPage from "./products/products";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main>
      <CreateProduct />
      <ProductsPage />
    </main>
  );
}
