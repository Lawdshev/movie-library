"use client";
import useFavorites from "@/api/favourites";
import MovieCard from "@/components/movie-card";
import Loader from "@/components/spinner";
import React, { useMemo, useState } from "react";

export default function FavoritesPage() {
  const [hasUpdated,setHasUpdated] = useState(false)
  const { getFavourites,loaded } = useFavorites();
  const favorites = useMemo(() => {
    return typeof window !== "undefined" ? getFavourites() : []
  }, [hasUpdated])
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Your Favorite Movies</h1>
      {!loaded && <Loader />}
      {favorites.length === 0 && loaded ? (
        <p>No favorite movies yet!</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} setHasUpdated={setHasUpdated} />
          ))}
        </div>
      )}
    </div>
  );
}
