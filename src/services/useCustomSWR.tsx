import { useEffect, useState } from 'react'
import {
	DeleteRequestHandler,
	GetRequestHandler,
	PatchRequestHandler,
	PostRequestHandler,
	PutRequestHandler,
} from './client'
import useSWR from 'swr'
import { ErrorCode } from '@promentor-app/shared-lib'

export interface IGlobalError {
	errors: ErrorObj[]
	errorCode: ErrorCode
}

export interface ErrorObj {
	message: string
	field?: string
}

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
	const [globalError, setGlobalError] = useState<IGlobalError | string | null>(
		null
	)

	useEffect(() => {
		if (request) setIsRequestReady(true)
	}, [request])

	const fetcherDefault = async () => {
		setIsRequestReady(false)

		try {
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
		} catch (e: any) {
			console.log(e)
			setGlobalError(e as IGlobalError)
		}
	}

	const { data, isLoading, error, mutate, isValidating } = useSWR(
		isRequestReady ? endpoint : null,
		fetcherDefault,
		{
			revalidateOnFocus: true,
			revalidateIfStale: true,
		}
	)

	useEffect(() => {
		console.log(error)

		if (error !== undefined && error !== null) {
			setGlobalError(error as string)
		}
	}, [error])

	return {
		data,
		isLoading,
		isValidating,
		error: globalError,
		mutate,
		setRequest,
		setIsRequestReady,
	}
}
