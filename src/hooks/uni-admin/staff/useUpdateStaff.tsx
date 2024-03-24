import { useEffect } from 'react'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import {
	ResourceManagerUpdateRequest,
	UpdateResourceManagerResponse,
} from '@promentor-app/shared-lib'

const api = new AuthService()

export const useUpdateStaff = () => {
	const {
		data,
		error,
		isLoading,
		isValidating,
		mutate,
		setRequest,
		setIsRequestReady,
	} = useCustomSWR<ResourceManagerUpdateRequest, UpdateResourceManagerResponse>(
		api.Patch_Staff(),
		'PATCH'
	)

	// useEffect(() => {
	// 	console.log(data)
	// }, [data])

	return {
		updateStaffResponse: data,
		setUpdateStaffRequest: setRequest,
		error_updateStaff: error,
		isLoading_updateStaff: isLoading,
		isValidating_updateStaff: isValidating,
		mutate_updateStaff: mutate,
		setIsRequestReady_updateStaff: setIsRequestReady,
	}
}
