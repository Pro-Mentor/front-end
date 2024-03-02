import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'
import { Group } from '@promentor-app/shared-lib'

const api = new AuthService()

export const useGetStaffTableDetails = () => {
	const { data, error, isLoading, isValidating, mutate } = useCustomSWR<
		unknown,
		Group
	>(api.Get_Staff(), 'GET')

	return {
		staffData: data,
		error,
		isLoading,
		isValidating,
		mutate,
	}
}
