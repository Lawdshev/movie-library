import { fetchMovieDetails, getCasts } from "@/api/fetch-movies";
import BackButton from "@/components/back-button";
import CastCard from "@/components/cast-card";
import Loader from "@/components/spinner";
import React, { Suspense } from "react";

export default async function MovieDetails({
  params
}: {
  params: Promise<{ id: string }>
  }) {
  const { id } =  await params;
  const movie = await fetchMovieDetails(id);
  const casts = await getCasts(id)
  
  return (
    <Suspense fallback={<Loader/>}>
      <div className="min-h-screen  text-gray-900 p-8">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Left: Movie Poster */}
          <div className="flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md shadow-lg w-full lg:w-96"
            />
          </div>

          {/* Right: Movie Details */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-900">{movie.title}</h1>
            <p className="italic text-gray-400 mt-1">{movie.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center">
                <span className="text-yellow-400 text-lg">★ ★ ★ ★ ☆</span>
              </div>
              <span className="text-gray-400">{movie.vote_count}</span>
            </div>

            {/* Genres */}
            <div className="mt-6">
              <h2 className="font-bold text-lg">THE GENRES</h2>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {movie?.genres?.map((genre) => (
                  <span
                    key={genre.name}
                    className="px-3 py-1 bg-red-500 text-white rounded-full text-sm"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Synopsis */}
            <div className="mt-6">
              <h2 className="font-bold text-lg">THE SYNOPSIS</h2>
              <p className="text-gray-400 mt-2">{movie.overview}</p>
            </div>

            {/* casts */}
            <div className="mt-6 w-full">
              <h2 className="font-bold text-xl text-gray-800 mb-4">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-6">
                {casts.cast.map((cst) => (
                  <CastCard key={cst.id} cast={cst} />
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-4">
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Website
              </button>
              <button className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700">
                IMDb
              </button>
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600">
                Trailer
              </button>
            </div>

            <div className="mt-4">
              <BackButton />
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
};