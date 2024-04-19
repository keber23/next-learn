import { useQuery } from "react-query";
import axios from "axios";
import { Movie } from "../types";

const useMovieQuery = (movieId: string) => {
  const apiUrl = `http://localhost:4000/movies/${movieId}`;

  const { isLoading, data, error } = useQuery({
    queryKey: ["movie", apiUrl],
    queryFn: ({ signal }) => {
      return axios.get<Movie>(apiUrl, { signal }).then((res) => {
        return res.data;
      });
    },
  });

  return { isLoading, data, error };
};

export default useMovieQuery;
