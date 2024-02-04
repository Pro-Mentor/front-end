import React, { StrictMode, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Keycloak from 'keycloak-js'
import {
	AuthenticationConfig,
	getAuthenticationConfig,
} from './utils/getAuthenticationConfig'
import Navbar from './components/shared/navbar/navbar'

interface AuthGuardProps {
	// You can define any props here if needed
}

const { hostname, protocol } = window.location

const config: AuthenticationConfig = getAuthenticationConfig(hostname, protocol)

const keycloakInstant = new Keycloak({
	realm: config.realm,
	url: config.idpUrl,
	clientId: config.clientId,
})

const AuthGuard: React.FC<AuthGuardProps> = () => {
	//const navigate = useNavigate()

	useEffect(() => {
		keycloakInstant
			?.init({
				onLoad: 'login-required',
				checkLoginIframe: false,
			})
			.then((authenticated: boolean) => {
				console.log(authenticated, keycloakInstant)
			})
			.catch((err: Error) => {
				console.log(err)
			})

		// set timer to check token expiration
		const tokenCheckInterval = setInterval(() => {
			if (keycloakInstant!.isTokenExpired()) {
				// redirect to login page
				const { hostname, protocol, port } = window.location
				const hrefWithoutPath = `${protocol}//${hostname}${
					port ? `:${port}` : ''
				}`
				keycloakInstant!.logout({ redirectUri: hrefWithoutPath })
				// You might want to use 'navigate' from 'react-router-dom' to navigate to the login page
				// navigate('/login');
			}
		}, 300000) // check every 5 minutes

		// clean up the resources with unmount
		return () => {
			clearInterval(tokenCheckInterval)
		}
	}, [])

	return (
		<StrictMode>
			<Navbar />
			<Outlet />
		</StrictMode>
	)
}

export { AuthGuard }
