"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user-store";

interface SignUpModalProps {
  setSignUpModal: (value: boolean) => void;
}

const checkEmail = async (email: string) => {
  if (!email) return false;

  const response = await fetch(`/api/auth/checkemail?email=${email}`);
  const data = await response.json();
  if (data.status && data.data.length === 0) {
    return false; // Email does not exist
  }

  return data.status; // Paystack returns status = true/false
};

function SignUpModal(props: SignUpModalProps) {
  const { setUser } = useUserStore();
  const [formCompleted, setFormCompleted] = useState(false); // State to track if form is completed
  // const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (formData: FormData) => {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!firstName || !lastName || !email || !password) {
      setErrorMessage("All fields except phone are required");
      return;
    }

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      props.setSignUpModal(false);
      const data = await res.json();
      alert(data.message || "Signed up successfully");
      // Automatically log in the user after successful sign-up
      setUser({
        firstName,
        lastName,
        email,
        customerCode: data.data.customer_code,
        phone: data.data.phone || undefined,
      });
    } else {
      const data = await res.json();
      alert(data.message || "Error signing up");
    }
  };

  const handleEmailBlur = async () => {
    const email = document.getElementById("email") as HTMLInputElement;

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email.value)) {
      setErrorMessage("Please enter a valid email address");
      setEmailExists(true);
      return;
    }

    if (!email.value) {
      setEmailExists(true);
      setErrorMessage("Email is required");
      return;
    }

    const res = await checkEmail(email.value);
    if (!res) {
      setEmailExists(res);
      setErrorMessage("");
      setFormCompleted(true);
    }

    if (res) {
      setEmailExists(res);
      setErrorMessage("Email already exists");
      setFormCompleted(false);
    }
  };

  return (
    <div className="fixed inset-0 z-80 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Log In</h2>
        <form action={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">First Name</label>
            <input
              required
              name="firstName"
              id="firstName"
              type="text"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Last Name</label>
            <input
              required
              name="lastName"
              id="lastName"
              type="text"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              required
              name="email"
              id="email"
              type="email"
              className="w-full px-3 py-2 border rounded"
              onFocus={() => {
                setEmailExists(false);
                setErrorMessage("");
              }}
              onBlur={handleEmailBlur}
            />
            {emailExists && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              required
              name="password"
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <Button
            type="submit"
            disabled={!formCompleted}
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded cursor-pointer"
          >
            Sign Up
          </Button>
          <Button
            className="w-full py-2 rounded cursor-pointer my-2"
            onClick={() => props.setSignUpModal(false)}
          >
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUpModal;
