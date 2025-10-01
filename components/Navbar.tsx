import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav>
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
        <div className="flex gap-4 items-center">
          <div className="flex gap-1 items-center">
            <UserIcon className="h-5 w-5" />
            <p>Account</p>
          </div>
          <div className="flex gap-1 items-center">
            <ShoppingCartIcon className="h-5 w-5" />
            <p>Cart</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
