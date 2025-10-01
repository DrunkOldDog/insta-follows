import { render, screen } from "@testing-library/react";
import { Dropzone } from "./Dropzone.component";

// Mock react-dropzone
jest.mock("react-dropzone", () => ({
  useDropzone: jest.fn(),
}));

const mockUseDropzone = require("react-dropzone").useDropzone;

describe("Dropzone", () => {
  const mockOnFilesSelected = jest.fn();
  const defaultProps = {
    name: "test-dropzone",
    onFilesSelected: mockOnFilesSelected,
    accept: {
      "text/html": [".html", ".htm"],
      "application/json": [".json"],
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const createMockFile = (name: string, type: string, size: number = 1024) => {
    const file = new File(["test content"], name, { type });
    Object.defineProperty(file, "size", { value: size });
    return file;
  };

  const setupDropzoneMock = (
    acceptedFiles: File[] = [],
    fileRejections: any[] = []
  ) => {
    mockUseDropzone.mockReturnValue({
      getRootProps: () => ({
        "data-testid": "dropzone-root",
        onClick: jest.fn(),
      }),
      getInputProps: () => ({
        "data-testid": "dropzone-input",
        onChange: jest.fn(),
      }),
      isDragActive: false,
      acceptedFiles,
      fileRejections,
    });
  };

  describe("File Type Acceptance", () => {
    it("should accept HTML files", () => {
      const htmlFile = createMockFile("test.html", "text/html");
      setupDropzoneMock([htmlFile], []);

      render(<Dropzone {...defaultProps} />);

      expect(screen.getByText("test.html")).toBeInTheDocument();
    });

    it("should accept JSON files", () => {
      const jsonFile = createMockFile("data.json", "application/json");
      setupDropzoneMock([jsonFile], []);

      render(<Dropzone {...defaultProps} />);

      expect(screen.getByText("data.json")).toBeInTheDocument();
    });
  });

  describe("File Type Rejection", () => {
    it("should reject non-HTML/JSON files", () => {
      const rejectedFile = createMockFile("document.pdf", "application/pdf");
      const rejection = {
        file: rejectedFile,
        errors: [
          { code: "file-invalid-type", message: "File type not accepted" },
        ],
      };
      setupDropzoneMock([], [rejection]);

      render(<Dropzone {...defaultProps} />);

      expect(screen.getByText("1 file rejected")).toBeInTheDocument();
    });

    it("should show error state when files are rejected", () => {
      const rejectedFile = createMockFile("document.txt", "text/plain");
      const rejection = {
        file: rejectedFile,
        errors: [
          { code: "file-invalid-type", message: "File type not accepted" },
        ],
      };
      setupDropzoneMock([], [rejection]);

      render(<Dropzone {...defaultProps} />);

      const dropzoneRoot = screen.getByTestId("dropzone-root");
      expect(dropzoneRoot).toHaveClass("border-destructive");
    });
  });

  describe("Drag and Drop Behavior", () => {
    it("should show drag active state", () => {
      setupDropzoneMock([], []);
      mockUseDropzone.mockReturnValue({
        getRootProps: () => ({
          "data-testid": "dropzone-root",
          onClick: jest.fn(),
        }),
        getInputProps: () => ({
          "data-testid": "dropzone-input",
          onChange: jest.fn(),
        }),
        isDragActive: true,
        acceptedFiles: [],
        fileRejections: [],
      });

      render(<Dropzone {...defaultProps} />);
      expect(screen.getByText("Drop files here")).toBeInTheDocument();
    });
  });

  describe("Selected and Non Selected Files", () => {
    it("should show the name of the selected files", () => {
      const htmlFile = createMockFile("test.html", "text/html");
      setupDropzoneMock([htmlFile], []);

      render(<Dropzone {...defaultProps} />);

      expect(screen.getByText("test.html")).toBeInTheDocument();
    });

    it("should show default text when no files are selected", () => {
      setupDropzoneMock([], []);

      render(<Dropzone {...defaultProps} />);

      expect(
        screen.getByText("Drag and drop or click to upload")
      ).toBeInTheDocument();
    });

    it("should show replace text when files are already selected", () => {
      const htmlFile = createMockFile("test.html", "text/html");
      setupDropzoneMock([htmlFile], []);

      render(<Dropzone {...defaultProps} />);

      expect(
        screen.getByText("Drag and drop or click to replace")
      ).toBeInTheDocument();
    });
  });

  describe("File Size Validation", () => {
    it("should handle file size limits", () => {
      const largeFile = createMockFile(
        "large.html",
        "text/html",
        10 * 1024 * 1024
      ); // 10MB
      const rejection = {
        file: largeFile,
        errors: [{ code: "file-too-large", message: "File is too large" }],
      };
      setupDropzoneMock([], [rejection]);

      render(<Dropzone {...defaultProps} maxSize={5 * 1024 * 1024} />); // 5MB limit

      expect(screen.getByText("1 file rejected")).toBeInTheDocument();
    });
  });
});
