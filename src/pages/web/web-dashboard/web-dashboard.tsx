/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Container, Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './web-dashboard.scss'
import { useGetPostsList } from '../../../hooks/web/posts/useGetPostsList'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import PostsList from '../../../components/web/posts/posts-list/posts-list'

const WebDashboard = () => {
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)

	const {
		getPostsListResponse,
		isLoading_getPostsList,
		isValidating_getPostsList,
		error_getPostsList,
		mutate_getPostsList,
	} = useGetPostsList()

	useEffect(() => {
		mutate_getPostsList()
	}, [])

	// useEffect(() => {
	// 	if (getPostsListResponse && getPostsListResponse.length > 0) {
	// 		console.log(getPostsListResponse)
	// 	} else if (getPostsListResponse && getPostsListResponse.length === 0) {
	// 	}
	// }, [getPostsListResponse])

	useEffect(() => {
		if (isLoading_getPostsList || isValidating_getPostsList) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [isLoading_getPostsList, isValidating_getPostsList])

	useEffect(() => {
		errorDisplayHandler(error_getPostsList)
	}, [error_getPostsList])

	return (
		<>
			<div className="page web-dashboard-page">
				<div className="col1">
					{getPostsListResponse && getPostsListResponse.length > 0 && (
						<PostsList list={getPostsListResponse} />
					)}
				</div>
				<div className="col2">
					<Container className="create-btn-container">
						<Button onClick={() => navigate('/create-post')}>
							Create a Post
						</Button>
					</Container>

					<div className="latest-events-container">latest events</div>
					<div className="latest-jobs-container">latest jobs</div>
				</div>
			</div>

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
					{/* <p>{loaderMsg}</p> */}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default WebDashboard
