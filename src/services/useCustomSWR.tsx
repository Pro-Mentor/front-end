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
	requestType: 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'POST' = 'GET',
	revalidateOnFocus: boolean = false,
	revalidateIfStale: boolean = false
) {
	const [isRequestReady, setIsRequestReady] = useState(
		requestType === 'GET' ? true : false
	)
	const [request, setRequest] = useState<RequestType | null>(null)

	useEffect(() => {
		if (request) setIsRequestReady(true)
	}, [request])

	const fetcherDefault = async () => {
		switch (requestType) {
			case 'GET':
				return await GetRequestHandler<ResponseType>(endpoint)
			case 'PUT':
				return await PutRequestHandler<RequestType, ResponseType>(
					request,
					endpoint
				)
			case 'DELETE':
				return await DeleteRequestHandler<RequestType, ResponseType>(
					request,
					endpoint
				)
			case 'PATCH':
				return await PatchRequestHandler<RequestType, ResponseType>(
					request,
					endpoint
				)
			case 'POST':
				return await PostRequestHandler<RequestType, ResponseType>(
					request,
					endpoint
				)
		}
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
