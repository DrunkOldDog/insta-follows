import { CodeInput } from "../CodeInput";

interface CodeValidationFormProps {
  onCodeSubmit: (code: string) => Promise<void>;
}

export default function CodeValidationForm({
  onCodeSubmit,
}: CodeValidationFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h2 className="text-2xl font-bold">Enter your code</h2>
          <p className="text-muted-foreground text-sm">
            Enter the code we sent to your email.
          </p>
        </div>
      </div>

      <div className="flex justify-center py-4">
        <CodeInput name="code" onCodeSubmit={onCodeSubmit} />
      </div>
    </div>
  );
}
