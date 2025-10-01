import Carousel from "@/components/Carousel";
import { Button } from "@/components/ui/button";
import { getProducts, ProductSimplified } from "@/lib/paystack";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function ProductPage({ params }: { params: { id: number } }) {
  const { id } = await params;
  const product: ProductSimplified = await getProducts(id);
  if (!product) {
    return notFound();
  }
  console.log("The selected product: ", product);
  return (
    <div>
      <div className="container mx-auto flex">
        <Link href={"/products"}>
          <div className="flex justify-center items-center my-10 text-[var(--color-primary)] cursor-pointer text-xl font-semibold">
            <ChevronLeftIcon className="h-6 w-6 mr-2" />
            <p>BACK TO PRODUCTS</p>
          </div>
        </Link>
      </div>
      <div className="container mx-auto flex gap-10">
        <Carousel imageUrl={product.imageUrl} />
        <div className="flex flex-col gap-4">
          <p className="font-extrabold text-xl ">{product.name}</p>
          <p className="font-extrabold text-2xl text-[var(--color-primary)]">
            N{product.price}
          </p>
          <p className="text-lg">{product.description}</p>
          <div>
            <Button className="bg-[var(--color-primary)] mr-2 text-xl cursor-pointer">
              <p>Add to Cart</p>
            </Button>
            <Button
              variant={"ghost"}
              className="cursor-pointer text-xl text-[var(--color-primary)]"
            >
              <p>Buy Now</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
