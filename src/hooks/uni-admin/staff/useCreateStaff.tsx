import { useEffect } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import {
	CreateResourceManagerResponse,
	ResourceManagerCreateRequest,
} from '@promentor-app/shared-lib'

const api = new AuthService()

export const useCreateStaff = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<ResourceManagerCreateRequest, CreateResourceManagerResponse>(
		api.Post_Staff(),
		'POST'
	)

	// useEffect(() => {
	// 	console.log(data)
	// 	console.log(error)
	// 	if (isLoading || isValidating) console.log(isLoading, isValidating)
	// }, [data, error, isLoading, isValidating])

	return {
		createStaffResponse: data,
		setCreateStaffRequest: setRequest,
		error_createStaff: error,
		isLoading_createStaff: isLoading,
		isValidating_createStaff: isValidating,
		mutate_createStaff: mutate,
		setIsRequestReady_createStaff: setIsRequestReady,
	}
}
