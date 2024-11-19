import { IMovie } from "@/utils/types";
import { useState, useEffect, useRef } from "react";

const useFavorites = () => {
  const [favourite, setFavourite] = useState<IMovie[]>([]);
  const [loaded,setLoaded] = useState(false)
  const initialRender = useRef(true);

  useEffect(() => {
    setLoaded(true)
    const storedFavourite = localStorage.getItem("favourites");
    if (storedFavourite) {
      const parsedFavourite = JSON.parse(storedFavourite);
      const uniqueSet = new Set([...favourite, ...parsedFavourite]);
      setFavourite(Array.from(uniqueSet));
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    setLoaded(true);
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("favourites", JSON.stringify(favourite));
    setLoaded(true);
  }, [favourite]);

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  // Add or remove a movie from favorites
  const toggleFavorite = (movie: IMovie) => {
    const isFavorite = favourite.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      setFavourite(favourite.filter((fav) => fav.id !== movie.id));
    } else {
      setFavourite([...favourite, movie]);
    }
  };

  return {
    favorites: favourite,
    loaded,
    toggleFavorite,
  };
};

export default useFavorites;
