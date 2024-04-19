import MovieDetails from "../components/MovieDetails";
import { Movie } from "../../types";
import useMovieQuery from "../../hooks/useMovieQuery";
import styles from "../page.module.css";
import { use } from "react";
import { fetchMovie } from "../lib/actions";

// export function loader({ params }: any) {
//   return params.movieId;
// }

export default async function Page({
  params,
}: {
  params: { movieId: string };
}) {
  //const movieId = useLoaderData() as string;
  //const [searchParams] = useSearchParams();

  const movieId = params.movieId;

  //const { data } = useMovieQuery(movieId as string);

  //const navigate = useNavigate();

  const movie = await fetchMovie(movieId);

  if (!movie) {
    return <p>Movie not found</p>;
  }

  function onCloseClick(): void {
    //navigate({ pathname: `/`, search: searchParams.toString() });
  }

  return (
    <section
      className={styles.movieDetailsContainer}
      data-cy="movieDetailsWrapper"
    >
      <button className={styles.closeButton}>Close</button>
      <MovieDetails movie={movie} />
    </section>
  );
}
