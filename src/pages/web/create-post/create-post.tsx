import PageHeader from '../../../components/shared/page-header/page-header'
import { Button, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// Define validation schema
const schema = yup.object().shape({
	image: yup.mixed().test('required', 'Image is required', (value) => {
		// Ensure value is a FileList and has at least one file
		return value instanceof FileList && value.length > 0
	}),
	description: yup.string().required('Description is required'),
})

interface FormData {
	image: FileList
	description: string
}

const CreatePost = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema) as any,
	})

	const onSubmit: SubmitHandler<FormData> = async (data) => {
		console.log(data)
		try {
			const formData = new FormData()
			formData.append('image', data.image[0])
			formData.append('description', data.description)

			// TODO: Send formData format request
			console.log(formData)
		} catch (error) {
			// Handle error
			console.error('Error uploading image:', error)
		}
	}
	return (
		<div className="page">
			<PageHeader title="Create a Post"></PageHeader>

			<div className="">
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="image">
						<Form.Label>Image</Form.Label>
						<Form.Control type="file" {...register('image')} />
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
	)
}

export default CreatePost
