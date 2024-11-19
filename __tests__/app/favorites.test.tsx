import React from "react";
import { render, screen } from "@testing-library/react";
import FavoritesPage from "@/app/favorites/page";
import useFavorites from "@/api/favourites";


jest.mock("../../src/api/favourites", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  __esModule: true,
  useRouter: jest.fn(),
}));

const mockUseFavorites = useFavorites as jest.Mock;

describe("FavoritesPage Component", () => {
    
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders a message when there are no favorite movies", () => {
    mockUseFavorites.mockReturnValue({
      favorites: [],
    });

    render(<FavoritesPage />);

    const heading = screen.getByText(/Your Favorite Movies/i);
    const noFavoritesMessage = screen.getByText(/No favorite movies yet!/i);

    expect(heading).toBeInTheDocument();
    expect(noFavoritesMessage).toBeInTheDocument();
  });

  it("renders a grid of favorite movies when favorites are present", () => {
    // Mock the favorites array with some movies
    const mockFavorites = [
      {
        id: 1,
        title: "Inception",
        poster_path: "/inception.jpg",
        release_date: "2010-07-16",
        vote_average: 8.8,
      },
      {
        id: 2,
        title: "The Dark Knight",
        poster_path: "/dark-knight.jpg",
        release_date: "2008-07-18",
        vote_average: 9.0,
      },
    ];

    mockUseFavorites.mockReturnValue({
      favorites: mockFavorites,
    });

    render(<FavoritesPage />);

    const heading = screen.getByText(/Your Favorite Movies/i);
    const movieCards = screen.getAllByTestId("movie-card");

    expect(heading).toBeInTheDocument();
    expect(movieCards.length).toBe(mockFavorites.length);

    // Check if movie titles appear in the document
    mockFavorites.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });
  });
});
