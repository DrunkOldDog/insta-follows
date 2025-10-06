import { signOut } from "@/actions";
import { LogoText } from "@/components/shared";
import {
  Button,
  Avatar,
  AvatarImage,
  AvatarFallback,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui";
import { AuthModal } from "@/features";
import { getAvatarInitials } from "@/lib/helpers";
import { createClient } from "@/lib/supabase/server";
import { GithubIcon } from "lucide-react";
import Link from "next/link";

export default async function NavigationBarLayout() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-black/20 shadow-lg">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <LogoText />
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="https://github.com/DrunkOldDog/insta-follows"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="sm" variant="ghost" className="text-gray-200">
              <GithubIcon />
            </Button>
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer hover:opacity-80 transition-opacity">
                  <AvatarImage src={user.user_metadata.avatar_url} />
                  <AvatarFallback>
                    {getAvatarInitials(user.user_metadata)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuItem onClick={signOut}>Log Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <AuthModal>
              <Button size="sm" variant="fancy">
                Log In
              </Button>
            </AuthModal>
          )}
        </div>
      </div>
    </nav>
  );
}
