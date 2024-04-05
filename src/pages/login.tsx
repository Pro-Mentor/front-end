import React from 'react'
import { useLocation } from 'react-router-dom'

interface DataProps {
	setIsAuthenticated: (s: boolean) => void
}

const Login: React.FC = () => {
	// const location = useLocation()
	// console.log(location.state)

	// const { props } = location.state || { data: null }

	return (
		<div className="">
			Login
			<button onClick={() => {}}>Login</button>
		</div>
	)
}

export default Login
