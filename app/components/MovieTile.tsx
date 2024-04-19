"use client";

import { useState } from "react";
import styles from "./MovieTile.module.css";
import { Movie } from "@/types";
import { extractYear } from "@/utils/extractYear";
import Image from "next/image";
import Link from "next/link";

interface Props {
  movie: Movie;
}

export default function MovieTile({ movie }: Props) {
  const { poster_path, title, release_date, genres } = movie;
  const [isContextMenuOpen, setIsContextMenuOpen] = useState(false);

  const handleContextMenuButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setIsContextMenuOpen(true);
  };

  const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    //onEdit(movie);
    setIsContextMenuOpen(false);
  };

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    //onDelete(movie);
    setIsContextMenuOpen(false);
  };

  const handleClick = () => {
    //onClick(movie);
  };

  let defaultPosterUrl = "200.png";

  return (
    <div className={styles.movieTile} data-cy="movieTile">
      <div className={styles.poster}>
        <Link href={`/${movie.id}`} className={styles.link}>
          <img
            //src={poster_path}
            src={poster_path || defaultPosterUrl}
            alt={title!}
            style={{ width: "322px", height: "455px" }}
            onError={(e) => {
              e.currentTarget.src = defaultPosterUrl;
              e.currentTarget.onerror = null;
            }}
          />
        </Link>
      </div>
      <div className={styles.info}>
        <h2 data-cy="movieTitle">{title}</h2>
        <span className={styles.releaseYear}>{extractYear(release_date)}</span>
      </div>
      <p className={styles.genres} data-cy="movieGenres">
        {genres?.join(", ")}
      </p>
      <button
        className={styles.contextMenuButton}
        onClick={handleContextMenuButtonClick}
      >
        ...
      </button>
      {isContextMenuOpen && (
        <div className={styles.contextMenu}>
          <button className={styles.contextMenuItem} onClick={handleEditClick}>
            Edit
          </button>
          <button
            className={styles.contextMenuItem}
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
