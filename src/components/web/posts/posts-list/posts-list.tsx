import { GetPostsListResponse } from '../../../../hooks/web/posts/useGetPostsList'
import PostItem from '../post-item/post-item'

type Props = {
	list: GetPostsListResponse[]
}

function PostsList({ list }: Props) {
	return (
		<div className="">
			{list &&
				list.length > 0 &&
				list.map((post) => {
					return <PostItem key={post.id} post={post} />
				})}
		</div>
	)
}

export default PostsList
