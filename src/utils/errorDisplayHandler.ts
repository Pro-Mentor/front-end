import { toast } from 'react-toastify'
import { IGlobalError } from '../services/useCustomSWR'

export function errorDisplayHandler(error: string | IGlobalError | null) {
	if (error !== undefined && error !== null) {
		if (typeof error !== 'string') {
			toast.error(error.errors[0].message)
		} else {
			toast.error(error)
		}
	}
}
