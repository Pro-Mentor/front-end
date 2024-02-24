import { useEffect, useState } from 'react'
import {
	DeleteRequestHandler,
	GetRequestHandler,
	PatchRequestHandler,
	PostRequestHandler,
	PutRequestHandler,
} from './client'
import useSWR from 'swr'

export function useCustomSWR<RequestType, ResponseType>(
	endpoint: string,
	revalidateOnFocus: boolean = false,
	revalidateIfStale: boolean = false,
	isGetRequest: boolean = false,
	isPutRequest: boolean = false,
	isDeleteRequest: boolean = false,
	isPatchRequest: boolean = false,
	isPostRequest: boolean = false
) {
	const [isRequestReady, setIsRequestReady] = useState(false)
	const [request, setRequest] = useState<RequestType | null>(null)

	useEffect(() => {
		if (request) setIsRequestReady(true)
	}, [request])

	const fetcherDefault = async () => {
		if (isGetRequest) return await GetRequestHandler<ResponseType>(endpoint)
		if (isPutRequest)
			return await PutRequestHandler<RequestType, ResponseType>(
				request,
				endpoint
			)
		if (isDeleteRequest)
			return await DeleteRequestHandler<RequestType, ResponseType>(
				request,
				endpoint
			)
		if (isPatchRequest)
			return await PatchRequestHandler<RequestType, ResponseType>(
				request,
				endpoint
			)
		if (isPostRequest)
			return await PostRequestHandler<RequestType, ResponseType>(
				request,
				endpoint
			)
	}

	const { data, isLoading, error, mutate, isValidating } = useSWR(
		isRequestReady ? endpoint : null,
		fetcherDefault,
		{
			revalidateOnFocus: revalidateOnFocus,
			revalidateIfStale: revalidateIfStale,
		}
	)
	return {
		data,
		isLoading,
		isValidating,
		error,
		mutate,
		setRequest,
		setIsRequestReady,
	}
}
