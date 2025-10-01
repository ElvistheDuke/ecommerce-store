"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useState } from "react";

interface props {
  imageUrl: string[];
}

function Carousel(props: props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log("The length of array is ", props.imageUrl.length);
  return (
    <div className="w-1/2 flex justify-center items-center h-[70vh] relative overflow-hidden">
      <div className="absolute h-full flex justify-between items-center top-0 left-0 w-full opacity-0 hover:opacity-100 cursor-pointer z-10 transition duration-300">
        <div
          onClick={() =>
            setCurrentIndex(currentIndex > 0 ? currentIndex - 1 : currentIndex)
          }
          className="hover:bg-black/30 transition duration-300 flex justify-center items-center rounded-full p-2"
        >
          <ChevronLeftIcon className="h-10 w-10 pr-1" />
        </div>
        <div
          onClick={() =>
            setCurrentIndex(
              currentIndex < props.imageUrl.length - 1
                ? currentIndex + 1
                : currentIndex
            )
          }
          className="hover:bg-black/30 transition duration-300 flex justify-center items-center rounded-full p-2"
        >
          <ChevronRightIcon className="h-10 w-10 pl-1" />
        </div>
      </div>
      {Array.isArray(props.imageUrl) &&
        props.imageUrl.map((url, index) => (
          <div
            key={index}
            className={`absolute h-[70vh] w-full flex justify-center items-center transition duration-500`}
            style={{
              left: `${(currentIndex - index) * 100}%`,
            }}
          >
            <Image
              src={url}
              height={350}
              width={300}
              alt={`Product image ${index + 1}`}
              unoptimized
              className="h-full w-auto"
            />
          </div>
        ))}
    </div>
  );
}

export default Carousel;
