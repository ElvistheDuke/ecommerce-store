import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function OrderPage() {
  return (
    <div>
      <div className="container mx-auto flex items-center gap-10 p-4 relative">
        <Link href={"/"}>
          <div className="flex items-center gap-2 cursor-pointer absolute top-[50%] left-0 -translate-y-[50%]">
            <ChevronLeftIcon className="h-6 w-6 cursor-pointer" />
            <p className="text-lg font-semibold md:block hidden">
              Back to Shopping
            </p>
          </div>
        </Link>
        <div className="flex-1 flex items-center justify-center text-lg font-bold">
          <p>My Orders</p>
        </div>
      </div>
      <div className="container mx-auto flex flex-col gap-2">
        <div>
          <p>ORDER ID: TESTID</p>
          <p>STATUS: PENDING</p>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
