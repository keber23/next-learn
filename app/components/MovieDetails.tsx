"use client";

import { extractYear } from "../../utils/extractYear";
import { formatDuration } from "../../utils/formatDuration";
import { Movie } from "../../types/movie";
import styles from "./MovieDetails.module.css";
//import defaultPosterUrl from "../../../assets/Images/200.png";
interface Props {
  movie: Movie;
}

export default function MovieDetails({ movie }: Props) {
  const {
    poster_path,
    title,
    release_date,
    vote_average,
    runtime,
    overview,
    genres,
  } = movie;

  let defaultPosterUrl = "200.png";

  return (
    <div className={styles.movieDetails}>
      <div className={styles.poster}>
        <img
          src={poster_path || defaultPosterUrl}
          alt={title}
          style={{ width: "323", height: "486px" }}
          onError={(e) => {
            e.currentTarget.src = defaultPosterUrl;
            e.currentTarget.onerror = null;
          }}
        />
      </div>
      <div className={styles.info}>
        <h2>{title}</h2>
        <span className={styles.rating}>{vote_average}</span>
        <p className={styles.genres}>{genres?.join(", ")}</p>
        <p>
          <span className={styles["release-date"]}>
            {extractYear(release_date)}
          </span>
          <span className={styles.duration}>{formatDuration(runtime)}</span>
        </p>
        <p>{overview}</p>
      </div>
    </div>
  );
}
