import { UploadIcon } from "lucide-react";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";

import { dropzoneVariants } from "./Dropzone.variants";

import type { DropzoneProps } from "./Dropzone.types";

const Dropzone = React.forwardRef<HTMLDivElement, DropzoneProps>(
  (
    {
      name,
      onFilesSelected,
      accept,
      multiple = false,
      children,
      className,
      size,
      state,
      disabled = false,
      maxFiles,
      maxSize,
      minSize,
      ...props
    },
    ref
  ) => {
    const onDrop = React.useCallback(
      (acceptedFiles: File[]) => {
        onFilesSelected?.(acceptedFiles);
      },
      [onFilesSelected]
    );

    const {
      getRootProps,
      getInputProps,
      isDragActive,
      acceptedFiles,
      fileRejections,
    } = useDropzone({
      onDrop,
      accept,
      multiple,
      disabled,
      maxFiles,
      maxSize,
      minSize,
      noClick: false,
      noKeyboard: false,
    });

    // Determine the current state
    const currentState = React.useMemo(() => {
      if (disabled) return "disabled";
      if (fileRejections.length > 0) return "error";
      if (acceptedFiles.length > 0) return "success";
      if (isDragActive) return "dragActive";
      return state || "default";
    }, [
      disabled,
      fileRejections.length,
      acceptedFiles.length,
      isDragActive,
      state,
    ]);

    const getAcceptedFilesText = () => {
      if (acceptedFiles.length === 1) return acceptedFiles[0].name;
      if (acceptedFiles.length > 1 && acceptedFiles.length < 3) {
        return acceptedFiles.map((file) => file.name).join(", ");
      }
      return `${acceptedFiles.length} files selected`;
    };

    const getContainerText = () => {
      if (isDragActive) return "Drop files here";
      if (acceptedFiles?.length > 0) return "Drag and drop or click to replace";
      return "Drag and drop or click to upload";
    };

    return (
      <div
        {...getRootProps()}
        ref={ref}
        className={cn(
          dropzoneVariants({
            size,
            state: currentState,
            className,
          })
        )}
        style={{ pointerEvents: "auto" }}
        {...props}
      >
        <input {...getInputProps()} name={name} />

        {children || (
          <div className="text-center pointer-events-none select-none">
            <div className="bg-primary/10 rounded-md p-4 w-fit mx-auto mb-2">
              <UploadIcon className="size-4 text-primary" />
            </div>

            {acceptedFiles && acceptedFiles.length > 0 && (
              <div className="text-sm text-primary">
                {getAcceptedFilesText()}
              </div>
            )}

            <div className="text-muted-foreground text-sm">
              {getContainerText()}
            </div>

            {fileRejections.length > 0 && (
              <div className="mt-2 text-sm text-destructive">
                {fileRejections.length} file
                {fileRejections.length > 1 ? "s" : ""} rejected
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Dropzone.displayName = "Dropzone";

export { Dropzone };
