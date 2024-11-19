import { fireEvent, render, screen } from "@testing-library/react";
import BackButton from "@/components/back-button";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("BackButton", () => {
  it("should render the Back button with correct text", () => {
      render(<BackButton />);
      expect(screen.getByTestId("back-button")).toBeInTheDocument()
      expect(screen.getByText("Back")).toBeInTheDocument()
  });

  it("should call router.back when clicked", () => {
    const mockBack = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ back: mockBack });

    const { getByText } = render(<BackButton />);
    const button = getByText(/Back/i);

    fireEvent.click(button);
    expect(mockBack).toHaveBeenCalledTimes(1);
  });
});
