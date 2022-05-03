import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

import { TweetDraftData } from "api/types";
import useAxios from "api/useAxios";

export default function useUpdateTweetDraft(
  id: number,
  extraProps?: UseMutationOptions<
    AxiosResponse<TweetDraftData>,
    AxiosError<any>,
    TweetDraftData
  >
) {
  const axios = useAxios();
  const queryClient = useQueryClient();

  return useMutation<
    AxiosResponse<TweetDraftData>,
    AxiosError<any>,
    TweetDraftData
  >((tweetDraftData) => updateTweetDraft(axios, id, tweetDraftData), {
    onSuccess: () => {
      queryClient.invalidateQueries("allTweetDrafts");
    },
    ...extraProps,
  });
}

export const updateTweetDraft = async (
  axios: AxiosInstance,
  id: number,
  tweetDraftData: TweetDraftData
): Promise<AxiosResponse<TweetDraftData>> => {
  return await axios.put(`/api/tweet_drafts?id=${id}`, {
    data: JSON.stringify(tweetDraftData),
  });
};
