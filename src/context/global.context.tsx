/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'
import { SessionHandler } from '../utils/session-handler'

export type GlobalContextType = {
	loggedInUser: string | null
	setupLoggedInUser: (user: string | null) => void
	token: string | null
	setupToken: (token: string | null) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

interface Props {
	children: React.ReactNode
}

const sessionHandler = new SessionHandler()

const GlobalProvider: React.FC<Props> = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState<string | null>(null)
	const [token, setToken] = useState<string | null>(null)

	const setupLoggedInUser = (user: string | null) => {
		setLoggedInUser(user)
		sessionHandler.saveSession('user', user as string)
	}

	const setupToken = (token: string | null) => {
		setToken(token)
		sessionHandler.saveSession('token', token as string)
	}

	return (
		<GlobalContext.Provider
			value={{ loggedInUser, setupLoggedInUser, token, setupToken }}
		>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
