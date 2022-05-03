import { AxiosError } from "axios"
import { useQuery } from "react-query"
import { FullUser } from "twitter-d"

import useAxios from "./useAxios"

export function useUserData() {
	const axios = useAxios()

	return useQuery<FullUser, AxiosError>(["me"], async () => {
		const response = await axios(`/api/me`)
		return response.data
	})
}
