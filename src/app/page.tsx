import React, { Suspense } from "react";
import Search from "@/components/Search";
import MoviesGrid from "@/components/movie-grid";
import InfiniteScroll from "@/components/infinite-scroll";
import { fetchPopularMovies } from "@/api/fetch-movies";
import Loader from "@/components/spinner";

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const { results, total_pages } = await fetchPopularMovies(currentPage, query);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold mb-6">Popular Movies</h1>
        <Search />
      </div>
      <Suspense key={query + currentPage} fallback={<Loader/>}>
          <MoviesGrid movies={results} />
        <InfiniteScroll totalPages={total_pages}/>
      </Suspense>
    </div>
  );
}
