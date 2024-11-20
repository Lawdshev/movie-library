"use client";
import { IMovie } from "@/utils/types";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface FavouriteContextProps {
  favourite:    IMovie[];
  toggleFavourite:(movie:IMovie)=>void
}

const defaultFavouriteContext: FavouriteContextProps = {
  favourite: [],
toggleFavourite:()=>{}
};

const FavouriteContext = createContext<FavouriteContextProps>(
  defaultFavouriteContext
);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourite, setFavourite] = useState<IMovie[]>([]);
  const initialRender = useRef(true);

  useEffect(() => {
    const storedFavourite = localStorage.getItem("favourites");
    if (storedFavourite) {
      const parsedFavourite = JSON.parse(storedFavourite);
      const uniqueSet = new Set([...favourite, ...parsedFavourite]);
      setFavourite(Array.from(uniqueSet));
    }
  }, []);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    window.localStorage.setItem("favourites", JSON.stringify(favourite));
  }, [favourite]);

  const addToFavourite = (  IMovie:  IMovie) => {
    setFavourite((prevFavourite) => [...prevFavourite,  IMovie]);
  };

  const removeFromFavourite = ( movie:IMovie) => {
    setFavourite((prevFavourite) =>
      prevFavourite.filter((a) => a.id !== movie.id)
    );
  };
    
    const toggleFavourite = (movie: IMovie) => {
        const isFavourite = favourite.some((favs) => favs.id === movie.id);
        if (isFavourite) {
            removeFromFavourite(movie)
        } else {
           addToFavourite(movie) 
        }
    };

  return (
    <FavouriteContext.Provider
      value={{ favourite, toggleFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavourites = () => {
  const context = useContext(FavouriteContext);
  return context;
};
