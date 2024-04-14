import Avatar from 'react-avatar'
import { GetPostsListResponse } from '../../../../hooks/web/posts/useGetPostsList'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import './post-item.scss'
import ExpandDescription from '../../../shared/expand-description/expand-description'
import { Card, Form, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faComments,
	faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
	faComment,
	faHeart as outlineHeart,
} from '@fortawesome/free-regular-svg-icons'
import { useState } from 'react'

type Props = {
	post: GetPostsListResponse
}

function PostItem({ post }: Props) {
	const fullName = `${post?.owner?.firstName} ${post?.owner?.lastName}`

	const [liked, setLiked] = useState(true)

	return (
		<Card className="post-item-container">
			<div className="top-row">
				<Avatar
					name={fullName || 'rashmi fer'}
					className="rounded-circle avatar"
					size="35"
				/>

				<div className="name-and-time">
					{post.owner !== null && <div className="">{fullName}</div>}
					<div className="time-ago">{timeAgo(post.createdAt)}</div>
				</div>
			</div>

			<div className="description-container">
				<ExpandDescription text={post.description} />
			</div>

			<Card.Img src={post.imageUrl} />

			<div className="footer">
				<FontAwesomeIcon
					style={{ color: '#35314e' }}
					icon={liked ? solidHeart : outlineHeart}
					fontSize={25}
				/>

				<InputGroup className="comment-line">
					<Form.Control
						placeholder="Add a comment"
						aria-label="Add a comment"
					/>
					<InputGroup.Text id="basic-addon2">
						<FontAwesomeIcon icon={faComment} style={{ color: '#35314e' }} />
					</InputGroup.Text>
				</InputGroup>

				<div className="comments-btn">
					<FontAwesomeIcon
						icon={faComments}
						className="px-2"
						style={{ color: '#35314e' }}
						fontSize={18}
					/>
				</div>
			</div>
		</Card>
	)
}

export default PostItem
