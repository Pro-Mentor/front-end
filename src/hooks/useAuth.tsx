import Keycloak from 'keycloak-js'
import { useContext, useEffect, useRef, useState } from 'react'
import {
	AuthenticationConfig,
	getAuthenticationConfig,
} from '../utils/getAuthenticationConfig'
import { GlobalContext, GlobalContextType } from '../context/global.context'

const { hostname, protocol } = window.location

const config: AuthenticationConfig = getAuthenticationConfig(hostname, protocol)

const keycloakInstant = new Keycloak({
	realm: config.realm,
	url: config.idpUrl,
	clientId: config.clientId,
})

const useAuth = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const isRun = useRef(false)

	const { loggedInUser, setupLoggedInUser, setupToken } = useContext(
		GlobalContext
	) as GlobalContextType

	useEffect(() => {
		if (isRun.current) return
		isRun.current = true

		keycloakInstant
			?.init({
				onLoad: 'login-required',
				checkLoginIframe: false,
			})
			.then((authenticated: boolean) => {
				// console.log(authenticated, keycloakInstant)
				// console.log(keycloakInstant?.realmAccess?.roles)
				// console.log(keycloakInstant?.token)

				const userRole = keycloakInstant?.realmAccess?.roles.find(
					(role) =>
						role === 'admin' ||
						role === 'resources-management' ||
						role === 'lecture' ||
						role === 'student' ||
						role === 'user'
				)

				setupLoggedInUser(userRole || null)
				setIsAuthenticated(authenticated)
				setupToken(keycloakInstant?.token || null)
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
	}, [setupLoggedInUser, setupToken])

	return { isAuthenticated, loggedInUser }
}

export default useAuth
