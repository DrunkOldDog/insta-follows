import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

export default function NavigationBarLayout() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <h1 className="text-xl sm:text-2xl font-bold">
          <span
            className={cn(
              "bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
              pacifico.className
            )}
          >
            Instafollows
          </span>
        </h1>
      </div>
    </nav>
  );
}
