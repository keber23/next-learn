"use client";
import { ChangeEvent } from "react";
import styles from "./SortControl.module.css";
import { SortOption } from "../../types/sortOption";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  initialSelection?: SortOption;
}

export default function SortControl({ initialSelection }: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedOption: SortOption = event.target.value as SortOption;

    const params = new URLSearchParams(searchParams);
    params.set("sortBy", selectedOption);
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles.sortControl}>
      <label htmlFor="sort" className={styles.label}>
        Sort by:
      </label>
      <select
        id="sort"
        name="sort"
        defaultValue={initialSelection || "releaseDate"}
        onChange={handleSelectionChange}
        className={styles.select}
      >
        <option value="release_date">Release Date</option>
        <option value="title">Title</option>
      </select>
    </div>
  );
}
