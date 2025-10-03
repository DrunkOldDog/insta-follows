import { LogoText } from "@/components/shared";
import { Button } from "@/components/ui";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default function NavigationBarLayout() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <LogoText />
        </Link>

        <div>
          <Link
            href="https://github.com/DrunkOldDog/insta-follows"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="outline" className="text-gray-200">
              <GithubIcon />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
