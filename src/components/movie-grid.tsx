import MovieCard from "./movie-card";
import { IMovie } from "@/utils/types";

interface IProps {
  movies:IMovie[]
}

export default function MoviesGrid({ movies }: IProps) {
    return (
      <div className="grid  grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies?.map((movie: any) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    );
}