import { GetStudentsResponse } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new AuthService()

export const useGetStudentsTableDetails = () => {
	const { data, error, isLoading, isValidating, mutate, customMutate } =
		useCustomSWR<unknown, GetStudentsResponse[]>(api.Get_Students(), 'GET')

	return {
		getStudentsResponse: data,
		error_getStudents: error,
		isLoading_getStudents: isLoading,
		isValidating_getStudents: isValidating,
		mutate_getStudents: customMutate,
	}
}
