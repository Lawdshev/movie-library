import { render, screen, waitFor } from "@testing-library/react";
import Page from "@/app/page";
import { fetchPopularMovies } from "@/api/fetch-movies";

// Mock the fetchPopularMovies API
jest.mock("../../src/api/fetch-movies", () => ({
  fetchPopularMovies: jest.fn(),
}));

// Mock child components
jest.mock("../../src/components/Search", () =>
  jest.fn(() => <div>Search Component</div>)
);
jest.mock("../../src/components/movie-grid", () =>
  jest.fn(() => <div>Movies Grid Component</div>)
);
jest.mock("../../src/components/infinite-scroll", () =>
  jest.fn(() => <div>Infinite Scroll Component</div>)
);

describe("Page Component", () => {
  const mockMovies = {
    results: [
      { id: 1, title: "Inception" },
      { id: 2, title: "The Dark Knight" },
    ],
    total_pages: 10,
  };

  beforeEach(() => {
    // Mock API response
    (fetchPopularMovies as jest.Mock).mockResolvedValue(mockMovies);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders popular movies and components correctly", async () => {
    const searchParams = Promise.resolve({ query: "", page: "1" });

    render(
     await Page({searchParams})
    );

    // Assert on static text
    expect(screen.getByText("Popular Movies")).toBeInTheDocument();
    expect(await screen.findByText("Search Component")).toBeInTheDocument();

    // Assert on mocked components
    await waitFor(() => {
      expect(screen.getByText("Movies Grid Component")).toBeInTheDocument();
      expect(screen.getByText("Infinite Scroll Component")).toBeInTheDocument();
    });

    // Ensure the API was called correctly
    expect(fetchPopularMovies).toHaveBeenCalledWith(1, "");
  });

  it("handles searchParams with a query and page correctly", async () => {
    const searchParams = Promise.resolve({ query: "action", page: "2" });

      render(await Page({ searchParams }));

    // Ensure the API was called with the correct parameters
    await waitFor(() => {
      expect(fetchPopularMovies).toHaveBeenCalledWith(2, "action");
    });

    // Assert on mocked components
    expect(
      await screen.findByText("Movies Grid Component")
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Infinite Scroll Component")
    ).toBeInTheDocument();
  });

});
