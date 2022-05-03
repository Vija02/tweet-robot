import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { useMutation, UseMutationOptions, useQueryClient } from "react-query";

import { TweetDraftData } from "api/types";
import useAxios from "api/useAxios";

export default function useCreateTweetDraft(
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
  >((tweetDraftData) => createTweetDraft(axios, tweetDraftData), {
    onSuccess: () => {
      queryClient.invalidateQueries("allTweetDrafts");
    },
    ...extraProps,
  });
}

export const createTweetDraft = async (
  axios: AxiosInstance,
  tweetDraftData: TweetDraftData
): Promise<AxiosResponse<TweetDraftData>> => {
  return await axios.post(`/api/tweet_drafts`, {
    data: JSON.stringify(tweetDraftData),
  });
};
