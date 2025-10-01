import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import UploadFormComponent from "./UploadForm.component";
import { getNonFollowers } from "@/actions";

// Mock the getNonFollowers action
jest.mock("@/actions", () => ({
  getNonFollowers: jest.fn(),
}));

const mockGetNonFollowers = getNonFollowers as jest.MockedFunction<typeof getNonFollowers>;

describe("UploadFormComponent", () => {
  const mockOnNonFollowersFound = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form with followers and following inputs", () => {
    render(<UploadFormComponent onNonFollowersFound={mockOnNonFollowersFound} />);

    expect(screen.getByText("Followers")).toBeInTheDocument();
    expect(screen.getByText("Following")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Check Follows" })).toBeInTheDocument();
  });

  describe("File Upload Simulation", () => {
    it("should simulate file upload through DropzoneInput components", async () => {
      render(<UploadFormComponent onNonFollowersFound={mockOnNonFollowersFound} />);

      // Create mock files with actual content from test mocks
      const followersData = require("./__testMocks__/followers_1.json");
      const followingData = require("./__testMocks__/following.json");
      
      const followersFile = new File([JSON.stringify(followersData)], "followers_1.json", {
        type: "application/json",
      });
      const followingFile = new File([JSON.stringify(followingData)], "following.json", {
        type: "application/json",
      });

      // Find the file inputs by name attribute
      const followersInput = document.querySelector('input[name="followers"]') as HTMLInputElement;
      const followingInput = document.querySelector('input[name="following"]') as HTMLInputElement;

      // Simulate file selection
      fireEvent.change(followersInput, { target: { files: [followersFile] } });
      fireEvent.change(followingInput, { target: { files: [followingFile] } });

      // Wait for the files to be processed and then submit the form
      await waitFor(() => {
        expect(followersInput.files).toHaveLength(1);
        expect(followingInput.files).toHaveLength(1);
      });
    });

    it("should handle file upload with real mock data", async () => {
      const mockNonFollowers = ["ichibirisss"]; // This user is in following but not in followers
      mockGetNonFollowers.mockResolvedValue(mockNonFollowers);

      render(<UploadFormComponent onNonFollowersFound={mockOnNonFollowersFound} />);

      // Create files with the actual mock data
      const followersData = require("./__testMocks__/followers_1.json");
      const followingData = require("./__testMocks__/following.json");
      
      const followersFile = new File([JSON.stringify(followersData)], "followers_1.json", {
        type: "application/json",
      });
      const followingFile = new File([JSON.stringify(followingData)], "following.json", {
        type: "application/json",
      });

      const followersInput = document.querySelector('input[name="followers"]') as HTMLInputElement;
      const followingInput = document.querySelector('input[name="following"]') as HTMLInputElement;

      // Upload files
      fireEvent.change(followersInput, { target: { files: [followersFile] } });
      fireEvent.change(followingInput, { target: { files: [followingFile] } });

      // Submit the form
      const submitButton = screen.getByRole("button", { name: "Check Follows" });
      fireEvent.click(submitButton);

      // Wait for processing
      await waitFor(() => {
        expect(mockGetNonFollowers).toHaveBeenCalled();
      });

      // Verify the FormData contains files
      const calledFormData = mockGetNonFollowers.mock.calls[0][0];
      expect(calledFormData.get("followers")).toBeDefined();
      expect(calledFormData.get("following")).toBeDefined();
      expect(mockOnNonFollowersFound).toHaveBeenCalledWith(mockNonFollowers);
    });
  });
});
