import { CodeInput } from "../CodeInput";

interface CodeValidationFormProps {
  optError?: string | null;
  onCodeSubmit: (code: string) => Promise<void>;
}

export default function CodeValidationForm({
  optError,
  onCodeSubmit,
}: CodeValidationFormProps) {
  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <CodeInput name="code" onCodeSubmit={onCodeSubmit} />
      {optError && <p className="text-red-700 text-sm">{optError}</p>}
    </div>
  );
}
