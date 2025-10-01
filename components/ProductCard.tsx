import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

interface ProductCardProps {
  // Define props here if needed in the future
  product: {
    id: number;
    name: string;
    description: string;
    price: number;
    product_code: string;
    imageUrl: string[];
  };
}

function ProductCard(props: ProductCardProps) {
  const { product } = props;
  console.log("Check Url", product.imageUrl[0]);
  return (
    <div>
      <div className="min-h-[450px] pb-16  rounded-lg flex flex-col items-center overflow-hidden shadow-md bg-white relative hover:shadow-xl transition duration-500 border-1 border-transparent hover:border-[var(--color-primary)] hover:-translate-y-2">
        <Link href={`/products/${product.id}`} className="overflow-hidden mt-4">
          <Image
            src={product.imageUrl[0] || "/placeholder.jpg"}
            alt={product.name}
            width={400}
            height={350}
            className="w-full bg-gray-200 h-[350px] hover:scale-125 duration-300 object-cover"
            unoptimized
          />
        </Link>
        {/* <div className="w-full bg-gray-200 h-[350px]"></div> */}
        <div className="text-center w-full flex flex-col items-center">
          <p className="font-semibold mt-4">{product.name}</p>
          <p className="">₦{product.price}</p>
          <Button className="mt-4 bg-[var(--color-primary)] w-[90%] absolute bottom-4 cursor-pointer">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
