import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import MovieDetails from "@/app/movies/[id]/page";
import { fetchMovieDetails, getCasts } from "@/api/fetch-movies";
import { useRouter } from "next/navigation";

const mockReplace = jest.fn();

jest.mock("../../src/components/back-button", () => ({
  __esModule: true,
  default: () => <div data-testid="back-button">Back</div>,
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

// Mock API functions
jest.mock("../../src/api/fetch-movies", () => ({
  __esModule: true,
  fetchMovieDetails: jest.fn(),
  getCasts: jest.fn(),
}));

const mockFetchMovieDetails = fetchMovieDetails as jest.Mock;
const mockGetCasts = getCasts as jest.Mock;

describe("MovieDetails Server Component", () => {
    beforeEach(() => {
      (useRouter as jest.Mock).mockReturnValue({
        replace: mockReplace,
        push: jest.fn(), // Add other methods if used
        pathname: "/current-path",
        query: {},
      });
    });
  const mockParams = { id: "12345" } as unknown as Promise<any>;
  const mockMovie = {
    title: "Inception",
    tagline: "Your mind is the scene of the crime.",
    vote_count: 10000,
    poster_path: "/inception.jpg",
    genres: [{ name: "Action" }, { name: "Sci-Fi" }],
    overview: "A mind-bending thriller about dreams within dreams.",
  };
  const mockCasts = {
    cast: [
      { id: 1, name: "Leonardo DiCaprio", profile_path: "/leo.jpg" },
      { id: 2, name: "Joseph Gordon-Levitt", profile_path: "/jgl.jpg" },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie details correctly", async () => {
    // Mock API responses
    mockFetchMovieDetails.mockResolvedValue(mockMovie);
    mockGetCasts.mockResolvedValue(mockCasts);

    // Wrap the server-side component in an async function for testing
    render(await MovieDetails({params:mockParams}));

    // Wait for the movie title to be rendered
    await waitFor(() => {
      expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    });

    // Check that other movie details are displayed
    expect(screen.getByText(mockMovie.tagline)).toBeInTheDocument();
    expect(screen.getByText(/★ ★ ★ ★ ☆/i)).toBeInTheDocument();
    expect(
      screen.getByText(mockMovie.vote_count.toString())
    ).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();

    // Check genres
    mockMovie.genres.forEach((genre) => {
      expect(screen.getByText(genre.name)).toBeInTheDocument();
    });

    // Check cast members
    mockCasts.cast.forEach((cast) => {
      expect(screen.getByText(cast.name)).toBeInTheDocument();
    });
  });

//   it("renders a fallback message when no movie details are available", async () => {
//     // Mock API responses for missing data
//     mockFetchMovieDetails.mockResolvedValue(null);
//     mockGetCasts.mockResolvedValue({ cast: [] });

//     const Wrapper = async () => <MovieDetails params={mockParams} />;
//     render(await Wrapper());

//     // Wait for the fallback message
//     await waitFor(() => {
//       expect(
//         screen.queryByText(/Your mind is the scene of the crime./i)
//       ).not.toBeInTheDocument();
//     });

//     expect(screen.getByText(/No details available/i)).toBeInTheDocument();
//   });
});
