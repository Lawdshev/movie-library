import { IMovie } from "@/utils/types";
import { useState, useEffect, useMemo } from "react";

const useFavorites = () => {
  const _savedFavorites = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("favorites")??"") : []
  const savedFavorites = useMemo(() => {
    return _savedFavorites || []
  },[])
  const [favorites, setFavorites] = useState<IMovie[]>(savedFavorites);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add or remove a movie from favorites
  const toggleFavorite = (movie: IMovie) => {
      const isFavorite = favorites.some((fav) => fav.id === movie.id);
      if (isFavorite) {
          setFavorites(favorites.filter((fav) => fav.id !== movie.id));
      } else {
          setFavorites([...favorites, movie]);
      }
  };

  return {
    favorites,
    toggleFavorite,
  };
};

export default useFavorites;
