/* eslint-disable react-hooks/exhaustive-deps */
import PageHeader from '../../../../components/shared/page-header/page-header'
import { Button, Form, Modal, Spinner } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUploadPost } from '../../../../hooks/web/posts/useUploadPost'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../../utils/errorDisplayHandler'
import './create-post.scss'
import { useCreatePost } from '../../../../hooks/web/posts/useCreatePost'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

// Define validation schema
const schema = yup.object().shape({
	image: yup.mixed().test('required', 'Image is required', (value) => {
		// Ensure value is a FileList and has at least one file
		return value instanceof FileList && value.length > 0
	}),
	description: yup.string().required('Description is required'),
})

interface PostFormData {
	image: FileList
	description: string
}

const CreatePost = () => {
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PostFormData>({
		resolver: yupResolver(schema) as any,
	})
	const [isLoading, setIsLoading] = useState(false)
	const [selectedImage, setSelectedImage] = useState<string | null>(null)

	const {
		setUploadPostRequest,
		setIsRequestReady_uploadPost,
		uploadPostResponse,
		isLoading_uploadPost,
		isValidating_uploadPost,
		error_uploadPost,
	} = useUploadPost()

	const {
		setCreatePostRequest,
		setIsRequestReady_createPost,
		createPostResponse,
		isLoading_createPost,
		isValidating_createPost,
		error_createPost,
	} = useCreatePost()

	const onSubmit: SubmitHandler<PostFormData> = async (data) => {
		console.log(data)
		setCreatePostRequest({
			imageUrl: selectedImage || '',
			description: data.description,
		})
		setIsRequestReady_createPost(true)
	}

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (files && files.length > 0) {
			const formData = new FormData()
			formData.append('image', files[0])
			setUploadPostRequest(formData)
			setIsRequestReady_uploadPost(true)
		}
	}

	useEffect(() => {
		if (uploadPostResponse) {
			setSelectedImage(import.meta.env.VITE_CDN_URL + uploadPostResponse.path)
			toast.success('Post image uploaded!')
		}
	}, [uploadPostResponse])

	useEffect(() => {
		if (createPostResponse) {
			console.log(createPostResponse)
			toast.success('Post created successfully!')
			navigate('/')
		}
	}, [createPostResponse])

	useEffect(() => {
		errorDisplayHandler(error_uploadPost)
		errorDisplayHandler(error_createPost)
	}, [error_uploadPost, error_createPost])

	useEffect(() => {
		if (
			isLoading_uploadPost ||
			isValidating_uploadPost ||
			isLoading_createPost ||
			isValidating_createPost
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_uploadPost,
		isValidating_uploadPost,
		isLoading_createPost,
		isValidating_createPost,
	])

	return (
		<>
			<div className="page create-post-page">
				<PageHeader title="Create a Post"></PageHeader>
				<div className="">
					<Form onSubmit={handleSubmit(onSubmit)} className="form">
						{selectedImage !== null && (
							<img
								src={selectedImage}
								alt="uploaded-image"
								className="uploaded-image"
							/>
						)}

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="file"
								{...register('image')}
								onChange={handleImageChange}
							/>
							{errors.image && (
								<Form.Text className="text-danger">
									{errors.image.message}
								</Form.Text>
							)}
						</Form.Group>

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control as="textarea" {...register('description')} />
							{errors.description && (
								<Form.Text className="text-danger">
									{errors.description.message}
								</Form.Text>
							)}
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
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

export default CreatePost
