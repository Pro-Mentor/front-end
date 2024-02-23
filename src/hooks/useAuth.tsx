import Keycloak from 'keycloak-js'
import { useEffect, useRef, useState } from 'react'

const client = new Keycloak({
	url: import.meta.env.VITE_KEYCLOAK_URL,
	realm: import.meta.env.VITE_KEYCLOAK_REALM,
	clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
})

const useAuth = () => {
	const [isLogin, setLogin] = useState(false)
	const isRun = useRef(false)

	useEffect(() => {
		if (isRun.current) return
		isRun.current = true

		client
			.init({ onLoad: 'login-required' })
			.then((isAuthenticated) => setLogin(isAuthenticated))
	}, [])

	return isLogin
}

export default useAuth
