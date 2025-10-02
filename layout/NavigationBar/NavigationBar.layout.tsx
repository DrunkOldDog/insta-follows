import { LogoText } from "@/components/shared";
import Link from "next/link";

export default function NavigationBarLayout() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <Link href="/">
          <LogoText />
        </Link>
      </div>
    </nav>
  );
}
