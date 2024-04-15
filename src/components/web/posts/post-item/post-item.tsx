/* eslint-disable react-hooks/exhaustive-deps */
import Avatar from 'react-avatar'
import { GetPostsListResponse } from '../../../../hooks/web/posts/useGetPostsList'
import { timeAgo } from '../../../../utils/dateTImeHandler'
import './post-item.scss'
import ExpandDescription from '../../../shared/expand-description/expand-description'
import { Card, Dropdown, Form, InputGroup, Spinner } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faComments,
	faHeart as solidHeart,
} from '@fortawesome/free-solid-svg-icons'
import {
	faComment,
	faHeart as outlineHeart,
} from '@fortawesome/free-regular-svg-icons'
import { useEffect, useState } from 'react'
import { useGetComments } from '../../../../hooks/web/posts/useGetCommentsByPost'
import { useAddCommentByPost } from '../../../../hooks/web/posts/useAddCommentByPost'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { usePostLike } from '../../../../hooks/web/posts/usePostLike'
import { useGetPost } from '../../../../hooks/web/posts/useGetPost'
import { SessionHandler } from '../../../../utils/session-handler'
import DotsToggle from '../../../shared/dots-toggle/dots-toggle'
import { Navigate, useNavigate } from 'react-router-dom'

type Props = {
	postItem: GetPostsListResponse
}

const sessionHandler = new SessionHandler()

function PostItem({ postItem }: Props) {
	const [post, setPost] = useState(postItem)
	const navigate = useNavigate()
	const fullName =
		post?.owner !== null
			? `${post?.owner?.firstName} ${post?.owner?.lastName}`
			: 'Unknown User'

	const { register, handleSubmit, reset } = useForm<{ comment: string }>()
	const [liked, setLiked] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [showComments, setShowComments] = useState(false)
	const [isOwner, setIsOwner] = useState(false)

	const {
		getCommentsResponse,
		isLoading_getComments,
		isValidating_getComments,
		error_getComments,
		setPostId_getComments,
		mutate_getComments,
	} = useGetComments()
	const {
		setIsRequestReady_AddComment,
		setAddCommentRequest,
		AddCommentResponse,
		isLoading_AddComment,
		isValidating_AddComment,
		error_AddComment,
		setPostId_AddComment,
		// mutate_AddComment,
	} = useAddCommentByPost()
	const {
		setPostId_postLike,
		postLikeResponse,
		isLoading_postLike,
		isValidating_postLike,
		error_postLike,
		mutate_postLike,
		setIsRequestReady_postLike,
		setPostLikeRequest,
	} = usePostLike()
	const {
		isLoading_getPost,
		isValidating_getPost,
		error_getPost,
		setPostId_getPost,
		getPostResponse,
		mutate_getPost,
	} = useGetPost()

	const likeHandler = () => {
		// setLiked(!liked)
		setPostId_postLike(post.id)
		setPostLikeRequest({
			id: post.id,
		})
		setIsRequestReady_postLike(true)
		mutate_postLike()
	}

	const addCommentHandler = (data: { comment: string }) => {
		// console.log(data)

		if (data.comment !== null && data.comment !== undefined) {
			// send comment
			setPostId_AddComment(post.id)
			setAddCommentRequest(data)
			setIsRequestReady_AddComment(true)
			reset()
			setShowComments(true)
			setPostId_getComments(post.id)
			mutate_getComments()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(addCommentHandler)()
	}

	const commentSectionDisplayHandler = () => {
		setShowComments(!showComments)
		setPostId_getComments(post.id)
		mutate_getComments()
	}

	const checkPermission = () => {
		const usernameOrEmail = sessionHandler.getSession('usernameOrEmail')
		if (
			usernameOrEmail !== null &&
			(usernameOrEmail === postItem?.owner?.username ||
				usernameOrEmail === postItem?.owner?.email)
		) {
			return true
		} else {
			return false
		}
	}

	useEffect(() => {
		// setPostId_getComments(post.id)
		// console.log(postItem)
		setPost(postItem)
		setLiked(postItem.likedByMe)
		setIsOwner(checkPermission())
		// mutate_getComments()
	}, [])

	// useEffect(() => {
	// 	if (getCommentsResponse && getCommentsResponse.length > 0) {
	// 		console.log(getCommentsResponse)
	// 	}
	// }, [getCommentsResponse])

	useEffect(() => {
		if (postLikeResponse) {
			setPostId_getPost(post.id)
			mutate_getPost()
		}
	}, [postLikeResponse])

	useEffect(() => {
		if (getPostResponse) {
			setPost(getPostResponse)
			setLiked(getPostResponse.likedByMe)
			// post = getPostResponse
		}
	}, [getPostResponse])

	useEffect(() => {
		if (AddCommentResponse) {
			toast.success('Your comment added!')
		}
	}, [AddCommentResponse])

	useEffect(() => {
		if (
			isLoading_AddComment ||
			isLoading_getComments ||
			isLoading_postLike ||
			isLoading_getPost ||
			isValidating_AddComment ||
			isValidating_getComments ||
			isValidating_postLike ||
			isValidating_getPost
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_AddComment,
		isLoading_getComments,
		isLoading_postLike,
		isLoading_getPost,
		isValidating_AddComment,
		isValidating_getComments,
		isValidating_postLike,
		isValidating_getPost,
	])

	useEffect(() => {
		errorDisplayHandler(error_AddComment)
		errorDisplayHandler(error_getComments)
		errorDisplayHandler(error_postLike)
		errorDisplayHandler(error_getPost)
	}, [error_AddComment, error_getComments, error_postLike, error_getPost])

	return (
		<div className="card-parent">
			{post && (
				<Card className="post-item-container">
					<div className="top-row">
						<div className="d-flexss">
							<Avatar
								name={fullName}
								className="rounded-circle avatar"
								size="35"
							/>

							<div className="name-and-time">
								<div className="">{fullName}</div>
								<div className="time-ago">{timeAgo(post.createdAt)}</div>
							</div>
						</div>
						{isOwner && (
							<Dropdown>
								<Dropdown.Toggle as={DotsToggle} />
								<Dropdown.Menu>
									<Dropdown.Item
										onClick={() => navigate('/edit-post/' + postItem.id)}
									>
										Edit Post
									</Dropdown.Item>
									<Dropdown.Item>Delete Post</Dropdown.Item>
								</Dropdown.Menu>
							</Dropdown>
						)}
					</div>

					<div className="description-container">
						<ExpandDescription text={post.description} />
					</div>

					<Card.Img src={post.imageUrl} />

					<div className="footer">
						<div className="like-container">
							<FontAwesomeIcon
								style={{ color: '#35314e' }}
								icon={liked ? solidHeart : outlineHeart}
								fontSize={25}
								className="like-btn"
								onClick={likeHandler}
							/>
							<div className="likes-count">{post.numberOfLikes}</div>
						</div>

						<Form onSubmit={handleSubmit(addCommentHandler)}>
							<InputGroup className="comment-line">
								<Form.Control
									placeholder="Add a comment"
									aria-label="Add a comment"
									{...register('comment')}
									onKeyDown={keyDownHandler} // Listen for Enter key press
								/>
								<InputGroup.Text id="basic-addon2">
									<FontAwesomeIcon
										icon={faComment}
										style={{ color: '#35314e' }}
									/>
								</InputGroup.Text>
							</InputGroup>
						</Form>

						<div
							className="comments-btn"
							onClick={commentSectionDisplayHandler}
						>
							<FontAwesomeIcon
								icon={faComments}
								className="px-2"
								style={{ color: '#35314e' }}
								fontSize={18}
							/>
						</div>
					</div>

					{showComments &&
						getCommentsResponse &&
						getCommentsResponse.length === 0 && (
							<div className="no-comments">No Comments</div>
						)}

					{showComments &&
						getCommentsResponse &&
						getCommentsResponse.length > 0 && (
							<div className="comments">
								{getCommentsResponse.map((comment) => {
									const fullName =
										comment?.firstName && comment?.lastName
											? `${comment?.firstName} ${comment?.lastName}`
											: 'Unknown User'
									return (
										<>
											<div className="top-row" key={comment.id}>
												<Avatar
													name={fullName}
													className="rounded-circle avatar"
													size="35"
												/>

												<div className="comment-container">
													<div className="name-and-time">
														<div className="fullname">{fullName}</div>
														<div className="time-ago">
															{timeAgo(comment.createdAt)}
														</div>
													</div>
													<div className="comment-line">
														<ExpandDescription text={comment.comment} />
													</div>
												</div>
											</div>
										</>
									)
								})}
							</div>
						)}
				</Card>
			)}

			{/* Loader overlay */}
			{isLoading && (
				<Card className="loading-card">
					<div className="spinner-container">
						<Spinner animation="border" role="status" />
					</div>
				</Card>
			)}
		</div>
	)
}

export default PostItem
