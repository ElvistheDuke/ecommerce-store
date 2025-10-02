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
  const formData = await request.formData();

  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const email = formData.get("email") as string;
  // const phone = formData.get("phone") as string;
  const password = formData.get("password") as string;

  if (!firstName || !lastName || !email || !password) {
    console.log("Missing fields:", { firstName, lastName, email, password });
    return new Response(
      JSON.stringify({ message: "All fields except phone are required" }),
      { status: 400 }
    );
  }

  const emailExists = await checkEmail(email);
  if (emailExists) {
    return new Response(JSON.stringify({ message: "Email already exists" }), {
      status: 400,
    });
  }

  const response = await fetch("https://api.paystack.co/customer", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      // phone: phone,
    }),
  });

  if (!response.status) {
    const errorData = await response.json();
    return new Response(
      JSON.stringify({ message: "Error creating customer", error: errorData }),
      { status: 500 }
    );
  }

  // return Response.redirect(new URL("/", request.url));

  return new Response(
    JSON.stringify({ message: "User registered successfully" }),
    { status: 200 }
  );
}
