/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useLogin } from '../hooks/useLogin'
import { SessionHandler } from '../utils/session-handler'
import { useNavigate } from 'react-router-dom'
import { GlobalContext, GlobalContextType } from '../context/global.context'

// Define validation schema
const schema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
})

export interface ILogin {
	username: string
	password: string
}

const sessionHandler = new SessionHandler()

const LoginComponent = () => {
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})
	const { loggedInUser, setupLoggedInUser, setupToken, setupIsAuthenticated } =
		useContext(GlobalContext) as GlobalContextType
	const {
		setLoginRequest,
		loginResponse,
		isLoading_login,
		isValidating_login,
		error_login,
		setIsRequestReady_login,
	} = useLogin()
	const navigate = useNavigate()

	const onSubmit = (data: ILogin) => {
		console.log(data)

		setLoginRequest(data)
		setIsRequestReady_login(true)
	}

	useEffect(() => {
		if (sessionHandler.getSession('token') !== null) {
			navigate('/')
		}
	})

	useEffect(() => {
		if (loginResponse) {
			// console.log(loginResponse)
			// sessionHandler.saveSession('token', loginResponse.access_token as string)

			const userRole = loginResponse?.clientData?.realm_access?.roles.find(
				(role: string) =>
					role === 'admin' ||
					role === 'resources-management' ||
					role === 'lecture' ||
					role === 'student' ||
					role === 'user'
			)

			setupLoggedInUser(userRole || null)
			setupToken(loginResponse?.access_token || null)
			setupIsAuthenticated(true)

			navigate('/')
		}
	}, [loginResponse])

	return (
		<Container>
			<Row className="justify-content-md-center mt-5">
				<Col xs={12} md={6}>
					<h2>Login</h2>
					<Form onSubmit={handleSubmit(onSubmit)}>
						<Form.Group controlId="username">
							<Form.Label>Username</Form.Label>
							<Controller
								name="username"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Form.Control
										{...field}
										type="text"
										placeholder="Enter username"
									/>
								)}
							/>
							<Form.Text className="text-danger">
								{errors.username?.message}
							</Form.Text>
						</Form.Group>

						<Form.Group controlId="password">
							<Form.Label>Password</Form.Label>
							<Controller
								name="password"
								control={control}
								defaultValue=""
								render={({ field }) => (
									<Form.Control
										{...field}
										type="password"
										placeholder="Enter password"
									/>
								)}
							/>
							<Form.Text className="text-danger">
								{errors.password?.message}
							</Form.Text>
						</Form.Group>

						<Button variant="primary" type="submit">
							Submit
						</Button>
					</Form>
				</Col>
			</Row>
		</Container>
	)
}

export default LoginComponent
