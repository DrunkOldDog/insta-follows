"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useEffect, useState } from "react";

interface CodeInputProps {
  name: string;
  onCodeSubmit: (code: string) => Promise<void>;
}

export default function CodeInput({ name, onCodeSubmit }: CodeInputProps) {
  const [code, setCode] = useState("");

  useEffect(() => {
    async function handleCodeSubmit() {
      await onCodeSubmit(code);
      setCode("");
    }

    if (code.length === 6) {
      handleCodeSubmit();
    }
  }, [code]);

  return (
    <InputOTP
      minLength={6}
      maxLength={6}
      name={name}
      inputMode="numeric"
      value={code}
      onChange={setCode}
    >
      <InputOTPGroup>
        {Array.from({ length: 6 }).map((_, index) => (
          <InputOTPSlot
            key={index}
            index={index}
            className="h-12 w-12 text-lg"
          />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
