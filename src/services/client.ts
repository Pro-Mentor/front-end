import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { SessionHandler } from '../utils/session-handler'

const sessionHandler = new SessionHandler()
const token = sessionHandler.getSession('token')
// console.log(token)

// service calls retrying configs
interface RetryConfig extends AxiosRequestConfig {
	retry: number
	retryDelay: number
}

const globalConfig: RetryConfig = {
	retry: 3,
	retryDelay: 2000,
}

// default request configs
const client: AxiosInstance = axios.create({
	timeout: 20000,
	//retry: 3,
	//retryDelay: 2000,
	headers: {
		//'Accept': '',
		// 'Authorization-Token': 'xzx',
		Authorization: `Bearer ${token}`,
	},
})

const fileUploadClient: AxiosInstance = axios.create({
	timeout: 20000,
	headers: {
		//'Accept': '',
		// 'Authorization-Token': 'xzx',
		Authorization: `Bearer ${token}`,
		'Content-Type': 'multipart/form-data',
	},
})

// client.interceptors.response.use(
// 	(response) => response,
// 	(error) => {
// 		const { config } = error

// 		if (!config || !config.retry) {
// 			return Promise.reject(error)
// 		}
// 		config.retry -= 1
// 		const delayRetryRequest = new Promise<void>((resolve) => {
// 			setTimeout(() => {
// 				console.log('retry the request', config.url)
// 				resolve()
// 			}, config.retryDelay || 3000)
// 		})
// 		return delayRetryRequest.then(() => client(config))
// 	}
// )
export { client, globalConfig }

// post request sending
export async function PostRequestHandler<RequestType, ResponseType>(
	requestModel: RequestType | null,
	endpoint: string,
	isFileUpload?: boolean,
	file?: FormData
) {
	try {
		let response: AxiosResponse<ResponseType>

		if (isFileUpload && file) {
			response = await fileUploadClient.post(endpoint, file, globalConfig)
		} else {
			response = await client.post(endpoint, requestModel, globalConfig)
			// .catch((error) => {
			// 	console.log(error)
			// 	throw error
			// })
			//const { data } = response
			//console.log(response)
			return response
		}
	} catch (error: any) {
		console.log(error.response.data)
		throw error.response.data
	}
}

export async function GetRequestHandler<ResponseType>(endpoint: string) {
	try {
		const response: AxiosResponse<ResponseType> = await client.get(
			endpoint,
			{
				headers: {
					Authorization: `Bearer ${sessionHandler.getSession('token')}`,
				},
				//globalConfig,
			}
			//globalConfig
		)
		const responseData = response.data as any
		// console.log(responseData)
		// return responseData
		if (responseData?.data) return responseData.data as ResponseType
		else return responseData as ResponseType
	} catch (error: any) {
		console.log(error.response.data)
		throw error
	}
}

export async function PutRequestHandler<RequestType, ResponseType>(
	requestModel: RequestType | null,
	endpoint: string
): Promise<ResponseType | string> {
	try {
		const response: AxiosResponse<ResponseType> = await client.put(
			endpoint,
			requestModel,
			globalConfig
		)
		const { data } = response

		return data
	} catch (error: any) {
		return error.response
	}
}

export async function DeleteRequestHandler<RequestType, ResponseType>(
	requestModel: RequestType | null,
	endpoint: string
): Promise<ResponseType | string> {
	try {
		const response: AxiosResponse<ResponseType> = await client.delete(
			endpoint,
			{
				data: requestModel,
			}
		)
		const { data } = response

		return data
	} catch (error: any) {
		return error.response
	}
}

export async function PatchRequestHandler<RequestType, ResponseType>(
	requestModel: RequestType | null,
	endpoint: string
): Promise<ResponseType | string> {
	try {
		const response: AxiosResponse<ResponseType> = await client.patch(
			endpoint,
			requestModel,
			globalConfig
		)
		const { data } = response

		return data
	} catch (error: any) {
		return error.response
	}
}

export async function FileUploadHandler<ResponseType>(
	endpoint: string,
	file: FormData
): Promise<ResponseType | string> {
	try {
		const response: AxiosResponse<ResponseType> = await fileUploadClient.post(
			endpoint,
			file,
			globalConfig
		)

		const { data } = response

		return data
	} catch (error: any) {
		return error.response
	}
}
