import { yupResolver } from '@hookform/resolvers/yup'
import React from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

type Props = {
	isAddNewModalOpen: boolean
	modalCloseHandler: () => void
	addNewConfirmHandler: (data: FormData) => void
}

const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	email: yup.string().email('Invalid email').required('Email is required'),
	firstName: yup.string().required('First name is required'),
	lastName: yup.string().required('Last name is required'),
	contactNumber: yup
		.string()
		.matches(/^\+?\d+$/, 'Contact number must contain only digits'),
})

export interface FormData {
	username: string
	email: string
	firstName: string
	lastName: string
	contactNumber?: string
}

const AddNewStaff = ({
	isAddNewModalOpen,
	modalCloseHandler,
	addNewConfirmHandler,
}: Props) => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(schema),
	})

	return (
		<Modal show={isAddNewModalOpen} onHide={modalCloseHandler}>
			<Form onSubmit={handleSubmit(addNewConfirmHandler)}>
				<Modal.Header closeButton>
					<Modal.Title>Add Staff Member</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form.Group controlId="firstName">
						<Form.Label>First Name</Form.Label>
						<Controller
							name="firstName"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.firstName?.message}
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="lastName">
						<Form.Label>Last Name</Form.Label>
						<Controller
							name="lastName"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.lastName?.message}
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="username">
						<Form.Label>Username</Form.Label>
						<Controller
							name="username"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.username?.message}
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email</Form.Label>
						<Controller
							name="email"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.email?.message}
						</Form.Text>
					</Form.Group>

					<Form.Group controlId="contactNumber">
						<Form.Label>Contact No.</Form.Label>
						<Controller
							name="contactNumber"
							control={control}
							defaultValue=""
							render={({ field }) => <Form.Control {...field} />}
						/>
						<Form.Text className="text-danger">
							{errors.contactNumber?.message}
						</Form.Text>
					</Form.Group>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={modalCloseHandler}>
						Close
					</Button>
					<Button type="submit" variant="primary">
						Add Staff
					</Button>
				</Modal.Footer>
			</Form>
		</Modal>
	)
}

export default AddNewStaff
