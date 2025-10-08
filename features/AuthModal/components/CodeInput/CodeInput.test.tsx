import { act, fireEvent, render, screen } from "@testing-library/react";
import CodeInput from "./CodeInput.component";

describe("CodeInput", () => {
  beforeAll(() => {
    // Mock ResizeObserver
    Object.defineProperty(window, "ResizeObserver", {
      writable: true,
      value: jest.fn().mockImplementation(() => ({
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
      })),
    });
  });

  it("should submit the code when the code is 6 digits", async () => {
    const onCodeSubmit = jest.fn();
    render(<CodeInput name="code" onCodeSubmit={onCodeSubmit} />);

    await act(async () =>
      fireEvent.change(screen.getByRole("textbox"), {
        target: { value: "123456" },
      })
    );

    expect(onCodeSubmit).toHaveBeenCalledWith("123456");
  });
});
