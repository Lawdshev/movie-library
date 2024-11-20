import { IMovie } from "@/utils/types";
import { useEffect, useRef, useState } from "react";

const useFavorites = () => {
  const [loaded, setLoaded] = useState(false);
    const initialRender = useRef(false)

    useEffect(() => {
      if (initialRender.current) {
        initialRender.current = false;
        return;
      }
    }, []);

  const getFavourites = (): IMovie[] => {
    setLoaded(false);
    const storedFavourite = window.localStorage.getItem("favourites");
    if (storedFavourite) {
      const parsedFavourite = JSON.parse(storedFavourite);
      setLoaded(true);
      return parsedFavourite;
    }
    setLoaded(true);
    return [];
  };

  const setFavourites = (movies: IMovie[]) => {
    return window.localStorage.setItem("favourites", JSON.stringify(movies));
  };

  const toggleFavorite = (movie: IMovie) => {
    let newList: IMovie[] = [];
    const currentList = getFavourites();
    const isFavorite = currentList.some((fav) => fav.id === movie.id);
    if (isFavorite) {
      newList = currentList.filter((mov) => mov.id !== movie.id);
    } else {
      newList = [...currentList, movie];
    }
    setFavourites(newList);
  };

  return {
    getFavourites,
    setFavourites,
    toggleFavorite,
    loaded,
  };
};

export default useFavorites;