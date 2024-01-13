export interface AuthenticationConfig {
	idpUrl: string
	clientId: string
	realm: string
}

export function getAuthenticationConfig(
	hostname: string,
	protocol: string
): AuthenticationConfig {
	const hostPart = hostname.split('.')
	const realm = hostPart[0]
	const topDomain = hostPart.slice(2).join('.')

	return {
		idpUrl: `${protocol}//idp.${topDomain}:8080`,
		clientId: 'client-frontend-web-app',
		// clientId: 'pro-mentor-web-app',
		realm,
	}
}
