import React from "react";
import { render, screen } from "@testing-library/react";
import MoviesGrid from "@/components/movie-grid"; // Adjust the path as necessary
import { IMovie } from "@/utils/types";
import MovieCard from "@/components/movie-card";

// Mock the MovieCard component
jest.mock("../../src/components/movie-card", () => ({
  __esModule: true,
  default: () => (<div data-testid="movie-card"></div>),
}));

describe("MoviesGrid Component", () => {
  const movies: IMovie[] = [
    {
      id: 1,
      title: "Movie 1",
      release_date: "2023-11-01",
      vote_average: 7.5,
      poster_path: "/movie1.jpg",
      overview: "Overview of Movie 1",
      adult: false,
      genre_ids: [],
      original_language: "en",
      original_title: "Movie 1",
      popularity: 50,
      video: false,
      vote_count: 100,
      backdrop_path: "some path",
      genres: [
        {
          name: "some",
        },
      ],
      tagline: "taggy",
    },
    {
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
    },
  ];

  it("renders the correct number of MovieCard components", () => {
    render(<MoviesGrid movies={[...movies]} />);
    const movieCards = screen.getAllByTestId("movie-card");
    expect(movieCards.length).toBe(movies.length);
  });


  it("renders an empty grid if no movies are provided", () => {
    render(<MoviesGrid movies={[]} />);

    const movieCards = screen.queryAllByTestId("movie-card");
    expect(movieCards.length).toBe(0);
  });
});
