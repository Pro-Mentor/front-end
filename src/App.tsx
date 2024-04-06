import React, { useContext } from 'react'
import '@/assets/styles/App.scss'
import { Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'
import { Spinner } from 'react-bootstrap'
import UniAdminDashboard from './pages/uni-admin/dashboard/uni-admin-dashboard'
import UniStaff from './pages/uni-admin/staff/uni-staff'
import Lecturers from './pages/uni-admin/lecturers/lecturers'
import Students from './pages/uni-admin/students/students'
import useAuth from './hooks/useAuth'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/login'
import { GlobalContext, GlobalContextType } from './context/global.context'

document.title = 'ProMentor'

function App() {
	const { loggedInUser, setupLoggedInUser, setupToken, isAuthenticated } =
		useContext(GlobalContext) as GlobalContextType

	return (
		<React.Suspense
			fallback={
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}
		>
			<ToastContainer
				position="top-right"
				autoClose={5000}
				closeOnClick
				pauseOnFocusLoss={false}
				pauseOnHover={false}
			/>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route element={<AuthGuard />}>
					{loggedInUser === 'admin' && isAuthenticated && (
						<>
							<Route path="/" element={<UniAdminDashboard />} />
							<Route path="/staff" element={<UniStaff />} />
							<Route path="/students" element={<Students />} />
							<Route path="/lecturers" element={<Lecturers />} />
						</>
					)}
				</Route>
			</Routes>
		</React.Suspense>
	)
}

export default App
