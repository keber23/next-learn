import axios from "axios";

import { buildApiUrl } from "../utils/buildApiUrl";
import { SearchParams, ApiData } from "../types";
import { useQuery } from "react-query";

const useMoviesQuery = async (searchParams: SearchParams) => {
  const apiUrl = await buildApiUrl(searchParams);

  // const { isLoading, data, error } = useQuery({
  //   queryKey: ["movies", apiUrl],
  //   queryFn: ({ signal }) => {
  //     return axios.get<ApiData>(apiUrl, { signal }).then((res) => {
  //       return res.data.data;
  //     });
  //   },
  // });

  const response = await axios.get<ApiData>(apiUrl);

  return response.data.data;

  //return { isLoading, data, error };
};

export default useMoviesQuery;
