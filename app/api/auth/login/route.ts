import { UserInterface } from "@/lib/paystack";

const checkEmail = async (email: string) => {
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

  if (data.status && data.data.length > 0) {
    return true;
  }
  return false;
};

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return new Response(
      JSON.stringify({ message: "Email and password are required" }),
      { status: 400 }
    );
  }

  const response = await fetch(
    `https://api.paystack.co/customer?email=${email}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      // Paystack does not support password authentication, so this is just a placeholder
      // In a real application, you would handle password verification differently
    }
  );

  const data = await response.json();

  if (data.status && data.data.length > 0) {
    const user: UserInterface = data.data[0];
    // Here, you would normally verify the password
    // Since Paystack does not handle passwords, we'll assume it's correct for this example
    return new Response(JSON.stringify({ message: "Login successful", user }), {
      status: 200,
    });
  }
  return new Response(
    JSON.stringify({ message: "Invalid email or password" }),
    { status: 401 }
  );
}
