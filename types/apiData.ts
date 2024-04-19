import { Movie } from "./movie";

export type ApiData = {
  totalAmount: number;
  data: Movie[];
  offset: number;
  limit: number;
};
