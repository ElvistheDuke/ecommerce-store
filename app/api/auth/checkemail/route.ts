import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { status: false, message: "Email required" },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `https://api.paystack.co/customer?email=${email}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    console.log("Checking email", email, data);

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { status: false, message: "Server error", error },
      { status: 500 }
    );
  }
}
