import type { CartItem } from "@/store/cart-store";

export async function POST(req: Request) {
  const { discount, customerCode, cartItems, tax } = await req.json();

  if (!customerCode || !cartItems || cartItems.length === 0) {
    return new Response(
      JSON.stringify({ message: "Customer code and cart items are required" }),
      { status: 400 }
    );
  }

  const lineItems = cartItems.map((item: CartItem) => ({
    product: item.product_code,
    quantity: item.quantity,
  }));

  const response = await fetch("https://api.paystack.co/paymentrequest", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: customerCode,
      line_items: [
        ...lineItems,
        { name: "Discount", amount: -discount, quantity: 1 },
        { name: "Tax", amount: tax, quantity: 1 },
      ],
      description: "Payment for items in cart",
    }),
  });
  const data = await response.json();
  if (response.ok) {
    return new Response(
      JSON.stringify({
        message: "Payment request created successfully",
        data: data.data,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: data.message || "Error creating payment request",
      }),
      { status: 400 }
    );
  }
}
