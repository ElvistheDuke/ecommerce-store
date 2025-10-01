import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/paystack";

async function ProductsPage() {
  const products = await getProducts();
  return (
    <div>
      <div className="container mx-auto mt-10">
        <p className="text-4xl mx-2 font-bold text-[var(--color-primary)]">
          All Products
        </p>
      </div>
      <ProductSection products={products} count={99} />
    </div>
  );
}

export default ProductsPage;
