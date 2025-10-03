"use client";
import { useCartStore, type CartItem } from "@/store/cart-store";
import {
  MinusCircleIcon,
  MinusIcon,
  PlusCircleIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";

interface CartItemProps {
  cartItem: CartItem;
}

function CartItem(props: CartItemProps) {
  const { addItem, removeItem } = useCartStore();
  return (
    <div className="w-full border-b  p-2 flex gap-4 mb-4">
      <div className="rounded overflow-hidden">
        <Image
          src={props.cartItem.imageUrl[0] || "/placeholder.jpg"}
          alt={props.cartItem.name}
          width={100}
          height={100}
          className="w-[100px] h-[100px] object-cover"
          unoptimized
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between w-full">
          <div>
            <p className="font-semibold">{props.cartItem.name}</p>
            <p className="text-xs">{props.cartItem.description}</p>
          </div>
          <div>
            <XMarkIcon className="h-5 w-5 cursor-pointer" />
          </div>
        </div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-lg font-bold">N{props.cartItem.price}</p>
          <div>
            <div className="flex items-center">
              <MinusCircleIcon
                onClick={() => {
                  addItem({ ...props.cartItem, quantity: -1 });
                }}
                className="h-8 w-8 cursor-pointer text-gray-500"
              />
              <span className="mx-2">{props.cartItem.quantity}</span>
              <PlusCircleIcon
                onClick={() => {
                  addItem({ ...props.cartItem, quantity: 1 });
                }}
                className="h-8 w-8 cursor-pointer text-green-700"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
