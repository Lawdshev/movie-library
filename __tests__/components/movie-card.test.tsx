import { render, screen, fireEvent } from "@testing-library/react";
import { useFavourites } from "@/providers/Favorite-provider";
import MovieCard from "@/components/movie-card";
import { IMovie } from "@/utils/types";
import "@testing-library/jest-dom";

jest.mock("../../src/providers/Favorite-provider", () => ({
  useFavourites: jest.fn(),
}));

describe("MovieCard Component", () => {
  const mockToggleFavourite = jest.fn();

  const mockMovie: IMovie = {
      id: 2,
      title: "Movie 2",
      release_date: "2023-10-10",
      vote_average: 8.2,
      poster_path: "/movie2.jpg",
      overview: "Overview of Movie 2",
      adult: false,
      genre_ids: [],
      original_language: "en",
      original_title: "Movie 2",
      popularity: 60,
      video: false,
      vote_count: 120,
      backdrop_path: "some path",
      genres: [
        {
          name: "some",
        },
      ],
      tagline: "taggy",
    };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the movie card with the correct details", () => {
    (useFavourites as jest.Mock).mockReturnValue({
      favourite: [],
      toggleFavourite: mockToggleFavourite,
    });

    render(<MovieCard movie={mockMovie} />);

    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });

  it("displays the filled heart icon if the movie is a favorite", () => {
    (useFavourites as jest.Mock).mockReturnValue({
      favourite: [mockMovie],
      toggleFavourite: mockToggleFavourite,
    });

    render(<MovieCard movie={mockMovie} />);

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toHaveClass("text-white");
  });

  it("displays the outlined heart icon if the movie is not a favorite", () => {
    (useFavourites as jest.Mock).mockReturnValue({
      favourite: [],
      toggleFavourite: mockToggleFavourite,
    });

    render(<MovieCard movie={mockMovie} />);

    const favoriteIcon = screen.getByTestId("favorite-icon");
    expect(favoriteIcon).toHaveClass("text-black");
  });

  it("calls toggleFavourite when the favorite button is clicked", () => {
    (useFavourites as jest.Mock).mockReturnValue({
      favourite: [],
      toggleFavourite: mockToggleFavourite,
    });

    render(<MovieCard movie={mockMovie} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockToggleFavourite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavourite).toHaveBeenCalledWith(mockMovie);
  });
});
