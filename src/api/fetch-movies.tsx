import { IGetCast, IGetMovies, IMovie } from "@/utils/types";

const API_URL = "https://api.themoviedb.org/3";
const API_KEY = "0eaae2146624836f2825bc2d4154ad6e";

export async function fetchMovieDetails(id: string): Promise<IMovie> {
  const res = await fetch(
    `${API_URL}/movie/${id}?api_key=0eaae2146624836f2825bc2d4154ad6e`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export async function fetchPopularMovies(page:number,query:string):Promise<IGetMovies> {
  const url = query
    ? `${API_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    : `${API_URL}/movie/popular?api_key=${API_KEY}&page=${page}&query=${query}`;
  const res = await fetch(
    url,
    { cache: "no-store" }
  );
  const data = await res.json();

  return data
}

export async function getCasts(id: string):Promise<IGetCast> {
  const res = await fetch(
    `${API_URL}/movie/${id}/credits?api_key=0eaae2146624836f2825bc2d4154ad6e`,
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}


