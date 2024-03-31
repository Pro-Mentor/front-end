import { QueryParamsSetter } from '../../utils/query-params-setter'

export class AuthService {
	gateway: string
	qs: QueryParamsSetter = new QueryParamsSetter()

	constructor() {
		this.gateway = import.meta.env.VITE_AUTH_URL
	}

	Get_GroupsClass() {
		return this.gateway + 'groups/class'
	}

	Post_Students() {
		return this.gateway + 'students'
	}

	Get_Students(params: Record<string, string> = {}) {
		return this.gateway + 'students' + '?' + this.qs.setQueryParams(params)
	}

	Get_Staff(params: Record<string, string> = {}) {
		return (
			this.gateway + 'resource-managers' + '?' + this.qs.setQueryParams(params)
		)
	}

	Post_Staff() {
		return this.gateway + 'resource-managers'
	}

	Patch_Staff(id: string) {
		return this.gateway + 'resource-managers/' + id
	}

	Post_Lecturer() {
		return this.gateway + 'lecturers'
	}

	Get_Lecturers(params: Record<string, string> = {}) {
		return this.gateway + 'lecturers' + '?' + this.qs.setQueryParams(params)
	}

	Patch_Lecturers(id: string) {
		return this.gateway + 'lecturers/' + id
	}
}
