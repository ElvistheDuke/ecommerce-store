import { Button } from "./ui/button";

function HeroSection() {
  return (
    <div className="relative bg-[url('/banner3.jpg')] bg-cover bg-center">
      {/* Gradient Overlay */}

      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--color-primary)] z-0"></div>

      {/* Content */}
      <div className="container relative mx-auto z-10">
        <div className="h-[60vh] mx-4 flex items-center justify-start px-4">
          <div className="w-full">
            <h1 className="text-5xl text-white font-bold w-[35%] min-w-[300px] leading-none">
              Shopping and Department Store
            </h1>
            <p className="max-w-96 text-white leading-none mt-6">
              Shopping is a bit of a relaxing hobby for me, which is sometimes
              troubling for the bank balance.
            </p>
            <Button
              variant={"default"}
              size={"lg"}
              className="mt-6 bg-[var(--color-secondary)] text-[var(--color-primary)] font-extrabold text-lg cursor-pointer hover:bg-[var(--color-secondary)]/90 transition duration-300 ease-in-out hover:scale-120"
            >
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
