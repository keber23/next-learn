"use client";

import { Genre } from "../../types";
import styles from "./GenreSelect.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FormEvent } from "react";

export const genres: Genre[] = [
  "ALL",
  "DOCUMENTARY",
  "COMEDY",
  "HORROR",
  "CRIME",
];

export default function GenreSelect({
  selectedGenre,
}: {
  selectedGenre?: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleGenreSelect = (genre: Genre) => {
    const newValue = genre.toLowerCase();
    const params = new URLSearchParams(searchParams);

    if (newValue && genre.toLowerCase() != "all") {
      params.set("genre", newValue);
    } else {
      params.delete("genre");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (event.currentTarget.elements.genre) {
      //onSearch(inputElement.current.value);
      const newValue = event.currentTarget.elements.genre.value;
      const params = new URLSearchParams(searchParams);
      if (newValue) {
        params.set("genre", newValue);
      } else {
        params.delete("genre");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <nav className={styles.nav}>
      {genres.map((genre) => {
        return (
          <form key={genre} onSubmit={handleSubmit} className={styles.form}>
            <button
              //href={genre === "ALL" ? "/" : `/?genre=${genre.toLowerCase()}`}
              //onClick={() => handleGenreSelect(genre)}
              data-cy={genre.toLowerCase()}
              className={`${styles.button} ${
                genre.toLowerCase() === selectedGenre?.toLowerCase() ||
                (!selectedGenre && genre.toLowerCase() === "all")
                  ? styles.selected
                  : ""
              }`}
              value={genre.toLowerCase() === "all" ? "" : genre.toLowerCase()}
              name="genre"
              type="submit"
              id="genre"
            >
              {genre}
            </button>
          </form>
        );
      })}
    </nav>
  );
}
