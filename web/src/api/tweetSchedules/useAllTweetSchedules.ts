import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { TweetSchedule } from "../types"

import useAxios from "../useAxios"

export function useAllTweetSchedules() {
	const axios = useAxios()

	return useQuery<TweetSchedule[], AxiosError>(
		["allTweetSchedules"],
		async () => {
			const response = await axios(`/api/tweet-schedules`)
			return response.data
		},
	)
}
