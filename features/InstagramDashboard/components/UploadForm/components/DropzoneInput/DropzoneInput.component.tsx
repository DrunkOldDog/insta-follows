import { Dropzone } from "@/components/shared";
import { Label } from "@/components/ui";

interface DropzoneInputProps {
  name: string;
  label: string;
}

export default function DropzoneInputComponent({
  name,
  label,
}: DropzoneInputProps) {
  return (
    <div className="grid gap-3 w-full">
      <Label htmlFor={name}>{label}</Label>
      <Dropzone
        name={name}
        accept={{
          "text/html": [".html", ".htm"],
          "application/json": [".json"],
        }}
      />
    </div>
  );
}
