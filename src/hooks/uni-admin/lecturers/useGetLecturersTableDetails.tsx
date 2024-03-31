import { GetLecturerResponse } from '@promentor-app/shared-lib'
import { AuthService } from '../../../services/api/auth-service.api.endpoints'
import { useCustomSWR } from '../../../services/useCustomSWR'

const api = new AuthService()

export const useGetLecturersTableDetails = () => {
	const { data, error, isLoading, isValidating, mutate, customMutate } =
		useCustomSWR<unknown, GetLecturerResponse[]>(api.Get_Lecturers(), 'GET')

	return {
		getLecturersResponse: data,
		error_getLecturers: error,
		isLoading_getLecturers: isLoading,
		isValidating_getLecturers: isValidating,
		mutate_getLecturers: customMutate,
	}
}
