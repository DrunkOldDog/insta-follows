import type { dropzoneVariants } from "./Dropzone.variants";
import type { VariantProps } from "class-variance-authority";
import type { Accept } from "react-dropzone";

export interface DropzoneProps extends VariantProps<typeof dropzoneVariants> {
  name: string;
  onFilesSelected?: (files: File[]) => void;
  accept?: Accept;
  multiple?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  maxFiles?: number;
  maxSize?: number;
  minSize?: number;
}
