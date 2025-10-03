'use client";';
import { useState } from "react";
import { Button } from "./ui/button";
import { useUserStore } from "@/store/user-store";

interface LogInModalProps {
  setLogInModal: (value: boolean) => void;
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

function LogInModal(props: LogInModalProps) {
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useUserStore();
  const [emailExists, setEmailExists] = useState(false); // State to track if email exists

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
      setErrorMessage("No account with this Email");
    }

    if (res) {
      setEmailExists(res);
      setErrorMessage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (
      document.querySelector('input[type="password"]') as HTMLInputElement
    ).value;

    if (!email || !password) {
      setErrorMessage("Email and password are required");
      return;
    }

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      setUser({
        firstName: data.user.first_name,
        lastName: data.user.last_name,
        email: data.user.email,
        customerCode: data.user.customer_code,
        phone: data.user.phone || undefined,
      });
      props.setLogInModal(false);
    } else {
      const data = await res.json();
      setErrorMessage(data.message || "Error logging in");
    }
  };

  return (
    <div className="fixed inset-0 z-80 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Log In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              id="email"
              onBlur={handleEmailBlur}
              onFocus={() => {
                setErrorMessage("");
                setEmailExists(false);
              }}
              type="email"
              className="w-full px-3 py-2 border rounded"
            />
            <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <Button
            type="submit"
            disabled={!emailExists}
            className="w-full bg-[var(--color-primary)] text-white py-2 rounded cursor-pointer"
          >
            Log In
          </Button>
          <Button
            className="w-full py-2 rounded cursor-pointer my-2"
            onClick={() => props.setLogInModal(false)}
          >
            Close
          </Button>
        </form>
      </div>
    </div>
  );
}

export default LogInModal;
