import { AxiosError } from "axios";
import { useQuery } from "react-query";

import { TweetDraft } from "../types";
import useAxios from "../useAxios";

export function useAllTweetDrafts() {
  const axios = useAxios();

  return useQuery<TweetDraft[], AxiosError>(["allTweetDrafts"], async () => {
    const response = await axios(`/api/tweet-drafts`);
    return response.data;
  });
}
