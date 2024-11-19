import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import MovieCard from "@/components/movie-card";
import useFavorites from "@/api/favourites";
import { IMovie } from "@/utils/types";

// Mocking `useFavorites`
jest.mock("../../src/api/favourites", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    favorites: [],
    toggleFavorite: jest.fn(),
  })),
}));

describe("MovieCard Component", () => {
  const mockToggleFavorite = jest.fn();
  const mockFavorites = [{ id: 1, title: "Favorite Movie" }];
  const movie: IMovie = {
    id: 1,
    title: "Sample Movie",
    release_date: "2023-11-18",
    vote_average: 7.8,
    poster_path: "/sample.jpg",
    overview: "Sample overview",
    adult: false,
    genre_ids: [],
    original_language: "en",
    original_title: "Sample Movie",
    popularity: 50,
    video: false,
      vote_count: 100,
      backdrop_path: "some",
      genres: [{
        name: "action"
      }],
      tagline:"sometagline"
  };

  beforeEach(() => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: mockFavorites,
      toggleFavorite: mockToggleFavorite,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the movie details correctly", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByText("Sample Movie")).toBeInTheDocument();
    expect(screen.getByText("Release: 2023-11-18")).toBeInTheDocument();
    expect(screen.getByText("Rating: 7.8/10")).toBeInTheDocument();
    expect(screen.getByAltText("Sample Movie")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/sample.jpg"
    );
  });

  it("renders the favorite icon as filled if the movie is in favorites", () => {
    render(<MovieCard movie={movie} />);
    expect(screen.getByTestId("favorite-icon")).toHaveClass("text-white");
  });

  it("renders the favorite icon as outlined if the movie is not in favorites", () => {
    (useFavorites as jest.Mock).mockReturnValue({
      favorites: [],
      toggleFavorite: mockToggleFavorite,
    });

    render(<MovieCard movie={movie} />);
    expect(screen.getByTestId("favorite-icon")).toHaveClass("text-black");
  });

  it("calls `toggleFavorite` when the favorite button is clicked", () => {
    render(<MovieCard movie={movie} />);

    const favoriteButton = screen.getByRole("button");
    fireEvent.click(favoriteButton);

    expect(mockToggleFavorite).toHaveBeenCalledWith(movie);
  });

  it("links to the movie details page", () => {
    render(<MovieCard movie={movie} />);
    const movieLink = screen.getByRole("link");

    expect(movieLink).toHaveAttribute("href", `/movies/${movie.id}`);
  });
});
