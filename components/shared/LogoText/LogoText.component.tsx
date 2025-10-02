import { cn } from "@/lib/utils";
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-pacifico",
});

interface LogoTextComponentProps {
  className?: string;
}

export default function LogoTextComponent({
  className,
}: LogoTextComponentProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center text-2xl font-bold leading-normal py-1 bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-white/90 to-rose-300",
        pacifico.className,
        className
      )}
    >
      Instafollows
    </div>
  );
}
