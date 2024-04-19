import Image from "next/image";
import styles from "./page.module.css";
import useMoviesQuery from "@/hooks/useMoviesQuery";
import GenreSelect from "@/app/components/GenreSelect";
import { genres } from "./components/GenreSelect";
import SortControl from "@/app/components/SortControl";
import { Movie, SearchParams, SortOption } from "@/types";
import MoviesFound from "@/app/components/MoviesFound";
import { fetchMovies } from "./lib/actions";
import MovieTile from "./components/MovieTile";
import SearchForm from "./components/SearchForm";
export default async function Home({
  searchParams,
}: {
  searchParams?: {
    genre?: string;
    query?: string;
    sortBy?: string;
  };
}) {
  // const [searchParams, setSearchParams] = useSearchParams();
  // const queryParams = Object.fromEntries(searchParams.entries());

  let searchQuery = searchParams?.query || "";
  let selectedGenre = searchParams?.genre || "";
  let selectedSort = searchParams?.sortBy || "release_date";

  //let selectedGenre = genres[0];

  // const navigate = useNavigate();

  const data = await fetchMovies(searchQuery, selectedGenre, selectedSort);

  // const handleSortChange = (newSort: SortOption) => {
  //   setSearchParams((searchParams) => {
  //     searchParams.set("sortBy", newSort);
  //     return searchParams;
  //   });
  // };

  // const handleGenreSelect = (genre: Genre) => {
  //   let selectedGenre = genre.toString().toLowerCase();

  // if (selectedGenre === "all") {
  //   setSearchParams((searchParams) => {
  //     searchParams.delete("genre");
  //     return searchParams;
  //   });
  // } else {
  //   setSearchParams((searchParams) => {
  //     searchParams.set("genre", selectedGenre);
  //     return searchParams;
  //   });
  // }
  //};

  function onMovieClick(movieId: number): void {
    // navigate({ pathname: `/${movieId}`, search: searchParams.toString() });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function onMovieEdit(movieId: number): void {
    //navigate({ pathname: `/${movieId}/edit`, search: searchParams.toString() });
  }

  const renderMovieTiles = (movies: Movie[] | undefined) => {
    return movies?.map((movie) => <MovieTile key={movie.id} movie={movie} />);
  };

  return (
    <div className={styles.container}>
      <section className={styles.movieSearchContainer}>
        <div className={styles.topRight}>
          <button className={styles.addButton}>+ ADD MOVIE</button>
        </div>
        <h1>FIND YOUR MOVIE</h1>
        <SearchForm initialSearchText={searchQuery} />
      </section>
      <div className={styles.movieGenreSortContainer}>
        <GenreSelect selectedGenre={searchParams?.genre} />
        <SortControl initialSelection={searchParams?.sortBy as SortOption} />
      </div>
      <MoviesFound count={data?.length} />
      <div className={styles.movieListContainer}>
        {/* {isLoading ? <Loader /> : renderMovieTiles(data)} */}
        {renderMovieTiles(data)}
      </div>
    </div>
  );
}
