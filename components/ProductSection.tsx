import ProductCard from "./ProductCard";
import Link from "next/link";

// const products = [
//   {
//     id: 1,
//     name: "Sample Product",
//     description: "This is a sample product description.",
//     price: 29.99,
//     product_code: "testcode",
//   },
//   {
//     id: 2,
//     name: "Sample Product 2",
//     description: "This is a sample product description.",
//     price: 39.99,
//     product_code: "testcode2",
//   },
//   {
//     id: 3,
//     name: "Sample Product 3",
//     description: "This is a sample product description.",
//     price: 49.99,
//     product_code: "testcode3",
//   },
//   {
//     id: 4,
//     name: "Sample Product 4",
//     description: "This is a sample product description.",
//     price: 59.99,
//     product_code: "testcode4",
//   },
//   {
//     id: 5,
//     name: "Sample Product5",
//     description: "This is a sample product description.",
//     price: 29.99,
//     product_code: "testcode 5",
//   },
//   {
//     id: 6,
//     name: "Sample Product 6",
//     description: "This is a sample product description.",
//     price: 39.99,
//     product_code: "testcode6",
//   },
//   {
//     id: 7,
//     name: "Sample Product 7",
//     description: "This is a sample product description.",
//     price: 49.99,
//     product_code: "testcode7",
//   },
//   {
//     id: 8,
//     name: "Sample Product 8",
//     description: "This is a sample product description.",
//     price: 59.99,
//     product_code: "testcode8",
//   },
// ];

interface ProductSectionProps {
  // Define props here if needed in the future
  products: {
    id: number;
    name: string;
    description: string;
    price: number;
    product_code: string;
    imageUrl: string[];
  }[];
  count: number;
}

function ProductSection(props: ProductSectionProps) {
  return (
    <main className="container mx-auto">
      <div className="mx-2 mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {props.products.map((product, index) =>
          index < props.count ? (
            <ProductCard key={product.id} product={product} />
          ) : (
            ""
          )
        )}
      </div>
    </main>
  );
}

export default ProductSection;
