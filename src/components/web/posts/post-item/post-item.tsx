import { GetPostsListResponse } from '../../../../hooks/web/posts/useGetPostsList'

type Props = {
	post: GetPostsListResponse
}

function PostItem({ post }: Props) {
	return <div className="">{post.description}</div>
}

export default PostItem
