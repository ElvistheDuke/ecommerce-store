"use client";
import CartItem from "@/components/CartItem";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cart-store";
import { useUserStore } from "@/store/user-store";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";

const addCommaNumber = (num: string) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function ShoppingCart() {
  //   const router = useRouter();
  const { items, clearCart } = useCartStore();
  const { user } = useUserStore();
  const total = items
    .reduce((total, item) => total + item.price * item.quantity, 0)
    .toFixed(2);
  const tax = (parseFloat(total) * 0.075).toFixed(2);
  const discount = (parseFloat(total) * 0.1).toFixed(2);

  const totalSum = (
    parseFloat(total) +
    parseFloat(tax) -
    parseFloat(discount)
  ).toFixed(2);

  const handleCheckout = async () => {
    const response = await fetch("/api/payment/createpayment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        customerCode: user?.customerCode,
        cartItems: items,
        discount: parseFloat(discount),
        tax: parseFloat(tax),
      }),
    });
    const data = await response.json();
    if (response.ok) {
      // Redirect to payment URL or handle success
      clearCart();
      window.location.href = `https://paystack.shop/pay/${data.data.request_code}`;
      //   router.push(`https://paystack.shop/pay/${data.data.request_code}`);
    } else {
      // Handle error

      console.log("Error creating payment request:", data);
    }
  };

  return (
    <div>
      <div className="container mx-auto flex items-center gap-10 p-4">
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer">
            <ChevronLeftIcon className="h-6 w-6 cursor-pointer" />
            <p className="text-lg font-semibold md:block hidden">
              Back to Shopping
            </p>
          </div>
        </Link>
        <div className="flex-1 flex items-center justify-center text-lg font-bold">
          <p>My Cart</p>
        </div>
        <div
          onClick={clearCart}
          className="flex items-center font-semibold cursor-pointer"
        >
          <p>Clear Cart</p>
        </div>
      </div>
      <div className="container mx-auto min-h-[60vh] flex flex-col items-center">
        {
          /* Cart Items will go here */ items.length === 0 ? (
            <p className="text-center text-gray-500">
              Your cart is empty. Start shopping now!
            </p>
          ) : (
            <div className="w-full">
              {items.map((item, index) => (
                <CartItem key={index} cartItem={item} />
              ))}
            </div>
          )
        }
      </div>
      <div>
        {items.length > 0 && (
          <div className="container mx-auto p-4 flex flex-col">
            <div className="flex justify-between text-lg">
              <p>Subtotal:</p>
              <p>N{addCommaNumber(total)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Tax(Vat):</p>
              <p>N{addCommaNumber(tax)}</p>
            </div>
            <div className="flex justify-between text-lg">
              <p>Discount:</p>
              <p>N{addCommaNumber(discount)}</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg">
              <p>Total:</p>
              <p className="font-semibold ">N{addCommaNumber(totalSum)}</p>
            </div>
            <Button
              onClick={handleCheckout}
              className="w-full bg-[var(--color-primary)] text-white py-2 rounded cursor-pointer my-4"
            >
              <p>Proceed to Checkout</p>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShoppingCart;
