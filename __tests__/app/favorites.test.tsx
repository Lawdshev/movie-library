import { render, screen } from "@testing-library/react";
import FavoritesPage from "@/app/favorites/page";
import { useFavourites } from "@/providers/Favorite-provider";

// Mock the useFavourites hook
jest.mock("../../src/providers/Favorite-provider", () => ({
  useFavourites: jest.fn(),
}));

describe("FavoritesPage", () => {
    const mockUseFavourites = useFavourites as jest.Mock;

    it("displays a message when there are no favorite movies", () => {
       mockUseFavourites.mockReturnValue({
         favourite: [],
       });
    render(<FavoritesPage />);

    // Check for the "No favorite movies yet!" text
    expect(screen.getByText("No favorite movies yet!")).toBeInTheDocument();
    expect(screen.queryByRole("listitem")).not.toBeInTheDocument(); // Ensure no movies are displayed
  });

  it("displays a list of favorite movies", () => {
    // Mock the favourite state with some movies
    const mockMovies = [
      { id: 1, title: "Inception", poster_path: "/inception.jpg" },
      { id: 2, title: "The Matrix", poster_path: "/matrix.jpg" },
    ];
    (useFavourites as jest.Mock).mockReturnValue({ favourite: mockMovies });

    render(<FavoritesPage />);

    // Check that the movie titles are rendered
    mockMovies.forEach((movie) => {
      expect(screen.getByText(movie.title)).toBeInTheDocument();
    });

    // Check that the correct number of MovieCards is rendered
    expect(screen.getAllByRole("img")).toHaveLength(mockMovies.length);
  });
});
