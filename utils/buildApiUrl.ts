"use server";

import { SearchParams } from "../types";

export async function buildApiUrl(
  searchQuery?: string,
  selectedGenre?: string,
  selectedSort?: string
) {
  let apiUrl = "http://localhost:4000/movies";

  apiUrl += `?sortBy=${selectedSort}&sortOrder=asc`;

  if (searchQuery) {
    apiUrl += `&searchBy=title&search=${searchQuery}`;
  }

  if (selectedGenre != "" && selectedGenre !== "ALL") {
    apiUrl += `&filter=${selectedGenre}`;
  }

  return apiUrl;
}
