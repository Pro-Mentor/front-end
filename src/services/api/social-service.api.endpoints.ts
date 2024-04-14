import { QueryParamsSetter } from '../../utils/query-params-setter'

export class SocialService {
	gateway: string
	qs: QueryParamsSetter = new QueryParamsSetter()

	constructor() {
		this.gateway = import.meta.env.VITE_SOCIAL_URL
	}

	Post_CreatePost() {
		return this.gateway + 'posts'
	}

	Get_Posts(params: Record<string, string> = {}) {
		return this.gateway + 'posts' + '?' + this.qs.setQueryParams(params)
	}
}
