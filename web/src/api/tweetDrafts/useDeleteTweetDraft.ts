import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

import useAxios from "api/useAxios";

export default function useDeleteTweetDraft(
  id: number,
  extraProps?: UseMutationOptions<AxiosResponse<string>, AxiosError<any>>
) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<string>, AxiosError<any>>(
    () => deleteTweetDraft(axios, id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("allTweetDrafts");
      },
      ...extraProps,
    }
  );
}

export const deleteTweetDraft = async (
  axios: AxiosInstance,
  id: number
): Promise<AxiosResponse<string>> => {
  return await axios.delete(`/api/tweet_drafts?id=${id}`);
};
