import { render, fireEvent } from "@testing-library/react";
import InfiniteScroll from "@/components/infinite-scroll";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("InfiniteScroll Component", () => {
  const mockReplace = jest.fn();
  const mockPathname = "/movies";

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue(mockPathname);
    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("disables the 'Previous' button on the first page", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const prevButton = getByText("Previous").closest("button");
    expect(prevButton).toBeDisabled();
  });

  it("disables the 'Next' button on the last page", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=5")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const nextButton = getByText("Next").closest("button");
    expect(nextButton).toBeDisabled();
  });

  it("calls replace with the correct URL when clicking 'Previous'", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=3")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const prevButton = getByText("Previous").closest("button");
    fireEvent.click(prevButton!);

    expect(mockReplace).toHaveBeenCalledWith(`${mockPathname}?page=2`);
  });

  it("calls replace with the correct URL when clicking 'Next'", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=3")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const nextButton = getByText("Next").closest("button");
    fireEvent.click(nextButton!);

    expect(mockReplace).toHaveBeenCalledWith(`${mockPathname}?page=4`);
  });

  it("does not call replace when clicking 'Previous' on the first page", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=1")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const prevButton = getByText("Previous").closest("button");
    fireEvent.click(prevButton!);

    expect(mockReplace).not.toHaveBeenCalled();
  });

  it("does not call replace when clicking 'Next' on the last page", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams("page=5")
    );

    const { getByText } = render(<InfiniteScroll totalPages={5} />);

    const nextButton = getByText("Next").closest("button");
    fireEvent.click(nextButton!);

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
