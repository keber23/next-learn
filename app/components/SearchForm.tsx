"use client";

import { FormEvent, useRef } from "react";
import styles from "./SearchForm.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface Props {
  initialSearchText: string;
}
export default function SearchForm({ initialSearchText }: Props) {
  const inputElement = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputElement.current) {
      //onSearch(inputElement.current.value);
      const newValue = inputElement.current.value;
      const params = new URLSearchParams(searchParams);
      if (newValue) {
        params.set("query", newValue);
      } else {
        params.delete("query");
      }
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="query"
        className={styles.input}
        type="text"
        placeholder="What do you want to watch?"
        ref={inputElement}
        defaultValue={initialSearchText}
      ></input>
      <button className={styles.button} type="submit">
        SEARCH
      </button>
    </form>
  );
}
