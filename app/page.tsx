import HeroSection from "@/components/HeroSection";
import ProductSection from "@/components/ProductSection";
import { getProducts } from "@/lib/paystack";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default async function Home() {
  const products = await getProducts();

  return (
    <div>
      <HeroSection />
      <div className="container mx-auto mt-10">
        <p className="text-4xl mx-2 font-bold text-[var(--color-primary)]">
          The Essentials
        </p>
      </div>
      <ProductSection products={products} count={8} />
      <Link href={"/products"}>
        <div className="flex justify-center items-center my-10 text-[var(--color-primary)] cursor-pointer text-xl font-semibold">
          <p>SHOW MORE</p>
          <ChevronRightIcon className="h-6 w-6 ml-2" />
        </div>
      </Link>
    </div>
  );
}
