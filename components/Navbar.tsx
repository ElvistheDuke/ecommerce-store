"use client";
import { useUserStore } from "@/store/user-store";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import {
  ArrowLeftStartOnRectangleIcon,
  ShoppingCartIcon,
  TruckIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";
import LogInModal from "./LogInModal";
import SignUpModal from "./SignUpModal";
import { useCartStore } from "@/store/cart-store";
import { motion } from "framer-motion";

const Navbar = () => {
  const { items } = useCartStore();
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);
  const [logInModal, setLogInModal] = useState(false);
  const [signUpModal, setSignUpModal] = useState(false);
  const [options, setOptions] = useState(false);
  return (
    <nav>
      {logInModal && <LogInModal setLogInModal={setLogInModal} />}
      {signUpModal && <SignUpModal setSignUpModal={setSignUpModal} />}

      <div className="flex justify-between p-4 container mx-auto items-center gap-10">
        <div>
          <Link href={"/"}>
            <p className="text-2xl font-bold text-[var(--color-primary)]">
              MyStore
            </p>
          </Link>
        </div>
        <div className=" gap-2 border border-gray-300 rounded-xl px-2 py-1 items-center flex-1 max-w-lg hidden sm:flex">
          <MagnifyingGlassIcon className="h-5 w-5" />
          <input type="text" className="w-full outline-0" name="" id="" />
        </div>
        {user ? (
          <div className="flex gap-4 items-center">
            <Link href={"/cart"}>
              <div className="flex gap-1 items-center relative cursor-pointer">
                {items.length > 0 && (
                  <div className="absolute bg-[var(--color-primary)] text-white rounded-full -left-5 text-xs w-5 h-5 flex items-center justify-center">
                    <p>{items.length}</p>
                  </div>
                )}
                <ShoppingCartIcon className="h-5 w-5" />
                <p>Cart</p>
              </div>
            </Link>
            {/* <div
              onClick={clearUser}
              className="flex gap-1 items-center cursor-pointer"
            >
              <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
              <p>Log Out</p>
            </div> */}
            <div
              onClick={() => setOptions(!options)}
              className="flex gap-1 items-center cursor-pointer relative"
            >
              <motion.div
                animate={{
                  height: options ? "auto" : 0,
                  overflow: "hidden",
                  padding: !options ? "0 0 0 20px" : "0 0 8px 20px",
                }}
                className="absolute w-30 left-[50%] -translate-x-[50%] pb-2 bg-white z-90 top-[120%] gap-1 flex flex-col items-start pl-5"
              >
                <Link href={"/orders"}>
                  <div className="flex gap-1 items-center cursor-pointer ">
                    <TruckIcon className="h-5 w-5" />
                    <p>Orders</p>
                  </div>
                </Link>
                <div
                  onClick={clearUser}
                  className="flex gap-1 items-center cursor-pointer "
                >
                  <ArrowLeftStartOnRectangleIcon className="h-5 w-5" />
                  <p>Log Out</p>
                </div>
              </motion.div>
              <UserIcon className="h-5 w-5" />
              <p>Account</p>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={() => setLogInModal(true)}
              variant={"ghost"}
              className="cursor-pointer"
            >
              <p>Log In</p>
            </Button>
            <Button
              variant={"default"}
              onClick={() => setSignUpModal(true)}
              className="cursor-pointer bg-[var(--color-primary)] text-white"
            >
              <p>Sign Up</p>
            </Button>
          </div>
        )}

        {/* <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center cursor-pointer">
            <UserIcon className="h-5 w-5" />
            <p>Account</p>
          </div>
          <div className="flex gap-1 items-center">
            <ShoppingCartIcon className="h-5 w-5" />
            <p>Cart</p>
          </div>
        </div> */}
      </div>
    </nav>
  );
};

export default Navbar;
