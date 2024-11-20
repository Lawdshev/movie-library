"use client"
import { useFavourites } from '@/providers/Favorite-provider';
import { IMovie } from '@/utils/types';
import React from 'react'
import { FaHeart, FaRegHeart } from "react-icons/fa"; 

const MovieCard = ({ movie }: { movie: IMovie }) => {
  const { favourite,toggleFavourite} = useFavourites();
  const isFavorite = favourite.some((fav) => fav.id === movie.id);
  
  return (
    <div
      key={movie.id}
      className="border p-2 rounded shadow hover:shadow-lg transition"
      data-testid="movie-card"
    >
      <a href={`/movies/${movie.id}`}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full h-auto rounded"
        />
        <h2 className="mt-2 text-lg font-medium">{movie.title}</h2>
        <p className="text-sm text-gray-500">Release: {movie.release_date}</p>
        <p className="text-sm text-yellow-600">
          Rating: {movie.vote_average}/10
        </p>
      </a>
      <button
        onClick={() => toggleFavourite(movie)}
        className={`mt-2 px-4 py-2 rounded ${
          isFavorite
            ? "bg-red-500 hover:bg-red-600"
            : "bg-gray-300 hover:bg-gray-400 text-black"
        }`}
      >
        {isFavorite ? (
          <FaHeart data-testid="favorite-icon" className="text-white" />
        ) : (
          <FaRegHeart data-testid="favorite-icon" className="text-black" />
        )}
      </button>
    </div>
  );
}

export default MovieCard
