"use server";

import { SearchParams } from "../types";

export async function buildQueryParams(
  searchQuery?: string,
  selectedGenre?: string,
  selectedSort?: string
) {
  let params: string = "";

  if (selectedSort) params += `?sortBy=${selectedSort}`;

  if (searchQuery) {
    params += `&query=${searchQuery}`;
  }

  if (selectedGenre != "" && selectedGenre !== "ALL") {
    params += `&genre=${selectedGenre}`;
  }

  return params;
}
