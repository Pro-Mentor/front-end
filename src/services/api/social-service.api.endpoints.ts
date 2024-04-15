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

	Get_Post(postId: string) {
		return this.gateway + 'posts' + '/' + postId
	}

	Post_AddComment(postId: string) {
		return this.gateway + 'posts' + '/' + postId + '/comments'
	}

	Get_Comments(postId: string, params: Record<string, string> = {}) {
		return (
			this.gateway +
			'posts' +
			'/' +
			postId +
			'/comments' +
			'?' +
			this.qs.setQueryParams(params)
		)
	}

	Put_PostLike(postId: string) {
		return this.gateway + 'posts' + '/' + postId + '/like'
	}
}
