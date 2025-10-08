"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "@/components/ui";
import { motion, AnimatePresence, type HTMLMotionProps } from "motion/react";
import { PropsWithChildren, useState } from "react";
import { signInWithOpt, verifyOptCode } from "@/actions";
import { CodeValidationForm, LoginForm } from "./components";

type AuthView = "login" | "opt";

interface AuthModalProps extends PropsWithChildren {}

const formAnimation: HTMLMotionProps<"div"> = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
  transition: { duration: 0.3 },
};

export default function AuthModal({ children }: AuthModalProps) {
  const [currentView, setCurrentView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [optError, setOptError] = useState<string | null>(null);

  const onOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      // Reset the form state after the animation
      setTimeout(() => {
        setCurrentView("login");
        setEmail("");
        setOptError(null);
      }, 300);
    }
  };

  const handleSignInWithOpt = async (formData: FormData) => {
    const data = await signInWithOpt(formData);
    if (data.success) {
      setEmail(formData.get("login-email") as string);
      setCurrentView("opt");
      return;
    }

    console.error(data);
  };

  const handleOptSubmit = async (code: string) => {
    // Handle password/code submission
    const formData = new FormData();
    formData.append("code", code);
    formData.append("email", email);

    const data = await verifyOptCode(formData);

    if (data.success) {
      // Close the modal on successful verification
      setIsOpen(false);
      // Reset the form state
      setCurrentView("login");
      setEmail("");
    } else {
      setOptError(data.error!);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="mb-2">
          <DialogTitle>
            {currentView === "login" ? "Welcome back" : "Enter your code"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-sm">
            {currentView === "login"
              ? "Sign in to your account"
              : "Enter the code we sent to your email"}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {currentView === "login" && (
            <motion.div key="login" {...formAnimation}>
              <LoginForm onSignInWithOpt={handleSignInWithOpt} />
            </motion.div>
          )}

          {currentView === "opt" && (
            <motion.div key="opt" {...formAnimation}>
              <CodeValidationForm
                optError={optError}
                onCodeSubmit={handleOptSubmit}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
