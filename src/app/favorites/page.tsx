"use client";
import MovieCard from "@/components/movie-card";
import { useFavourites } from "@/providers/Favorite-provider";
import React from "react";

export default function FavoritesPage() {
  const { favourite } = useFavourites();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {favourite.length === 0  ? (
        <p>No favorite movies yet!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favourite.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
