import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import Search from "@/components/Search";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("Search Component", () => {
  const mockReplace = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      replace: mockReplace,
    });
    (usePathname as jest.Mock).mockReturnValue("/movies");
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());
  });

  it("renders the input field and search icon", () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search movies...");
    const searchIcon = screen.getByTestId("search-icon");

    expect(input).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
  });

  it("updates query params when typing in the search input", async () => {
    render(<Search />);

    const input = screen.getByPlaceholderText("Search movies...");

    fireEvent.change(input, { target: { value: "Avengers" } });

    // Debounced function; wait for it to trigger
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/movies?page=1&query=Avengers");
    });
  });

  it("removes query param when input is cleared", async () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ query: "Avengers" })
    );

    render(<Search />);

    const input = screen.getByPlaceholderText("Search movies...");
    fireEvent.change(input, { target: { value: "" } });

    // Debounced function; wait for it to trigger
    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("/movies?page=1");
    });
  });

  it("shows the default value if query param is present", () => {
    (useSearchParams as jest.Mock).mockReturnValue(
      new URLSearchParams({ query: "Spiderman" })
    );

    render(<Search />);

    const input = screen.getByPlaceholderText("Search movies...");
    expect(input).toHaveValue("Spiderman");
  });
});
