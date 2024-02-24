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

	Get_Students(params: Record<string, string>) {
		return this.gateway + 'students' + '?' + this.qs.setQueryParams(params)
	}
}
