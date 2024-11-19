export interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  tagline: string;
  genres:{name: string}[]
};

export interface IGetMovies {
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface CastMember {
  adult: boolean;
  cast_id: number;
  character: string;
  credit_id: string;
  gender: number; // Gender is usually 1 (female), 2 (male), or 0/undefined (unknown).
  id: number;
  known_for_department: string;
  name: string;
  order: number;
  original_name: string;
  popularity: number;
  profile_path: string | null; 
}

export interface CrewMember {
  adult: boolean;
  credit_id: string;
  department: string;
  gender: number; // Gender is usually 1 (female), 2 (male), or 0/undefined (unknown).
  id: number;
  job: string;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null; 
}

export interface IGetCast {
  cast: CastMember[];
  crew: CrewMember[]
}
