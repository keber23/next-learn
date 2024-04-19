import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { Movie } from "../types";

const useAddUpdateMovieQuery = () => {
  const queryClient = useQueryClient();
  const apiUrl = "http://localhost:4000/movies";

  const { mutate, data, error, isSuccess, isError } = useMutation({
    mutationFn: (movie: Movie) => {
      if (movie.id) {
        return axios.put<Movie>(apiUrl, movie).then((res) => res.data);
      } else {
        return axios.post<Movie>(apiUrl, movie).then((res) => res.data);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { mutate, data, error, isSuccess, isError };
};

export default useAddUpdateMovieQuery;
