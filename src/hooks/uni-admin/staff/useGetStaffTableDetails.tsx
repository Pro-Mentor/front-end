import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { GetResourceManagersResponse, Group } from '@promentor-app/shared-lib'

const api = new AuthService()

export const useGetStaffTableDetails = () => {
	const { data, error, isLoading, isValidating, mutate, customMutate } =
		useCustomSWR<unknown, GetResourceManagersResponse[]>(api.Get_Staff(), 'GET')

	return {
		getStaffResponse: data,
		error_getStaff: error,
		isLoading_getStaff: isLoading,
		isValidating_getStaff: isValidating,
		mutate_getStaff: customMutate,
	}
}
