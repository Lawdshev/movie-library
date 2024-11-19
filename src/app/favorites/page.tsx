"use client"
import useFavorites from "@/api/favourites";
import MovieCard from "@/components/movie-card";
import React from "react";

export default function FavoritesPage() {
const { favorites } = useFavorites();
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies yet!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
