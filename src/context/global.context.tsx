/* eslint-disable react/prop-types */
import { createContext, useState } from 'react'

export type GlobalContextType = {
	loggedInUser: string | null
	setupLoggedInUser: (user: string | null) => void
}

export const GlobalContext = createContext<GlobalContextType | null>(null)

interface Props {
	children: React.ReactNode
}

const GlobalProvider: React.FC<Props> = ({ children }) => {
	const [loggedInUser, setLoggedInUser] = useState<string | null>(null)

	const setupLoggedInUser = (user: string | null) => {
		setLoggedInUser(user)
	}

	return (
		<GlobalContext.Provider value={{ loggedInUser, setupLoggedInUser }}>
			{children}
		</GlobalContext.Provider>
	)
}

export default GlobalProvider
