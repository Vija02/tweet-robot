import axios, { AxiosError } from "axios"

const errorFunction = function (error: AxiosError) {
	return Promise.reject(error)
}

// TODO: Handle API URL
const baseURL = "http://127.0.0.1:8000"

export default () => {
	const instance = axios.create({
		baseURL: baseURL,
	})

  instance.interceptors.response.use(
    function (response) {
      return response;
    },
    (error) => {
      return errorFunction(error);
    }
  );

	return instance
}
