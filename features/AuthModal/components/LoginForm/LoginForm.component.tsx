import { MotionButton } from "@/components/shared/MotionButton";
import { Input, Label } from "@/components/ui";
import { Mail } from "lucide-react";

interface LoginFormProps {
  onSignInWithOpt: (formData: FormData) => Promise<void>;
}

export default function LoginForm({ onSignInWithOpt }: LoginFormProps) {
  return (
    <form action={onSignInWithOpt} className="space-y-4">
      <MotionButton
        disabled
        type="button"
        variant="outline"
        className="w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Mail className="w-4 h-4 mr-2" />
        Continue with Google
      </MotionButton>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="login-email">Email</Label>
        <Input
          id="login-email"
          name="login-email"
          type="email"
          placeholder="Enter your email"
          required
        />
      </div>

      <MotionButton
        type="submit"
        variant="fancy"
        className="w-full"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Continue
      </MotionButton>
    </form>
  );
}
