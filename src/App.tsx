import React from 'react'
import '@/assets/styles/App.scss'
import { Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'
import { Spinner } from 'react-bootstrap'
import UniAdminDashboard from './pages/uni-admin/dashboard/uni-admin-dashboard'
import UniAdminAdmins from './pages/uni-admin/admins/uni-admin-admins'

function App() {
	return (
		<React.Suspense
			fallback={
				<Spinner animation="border" role="status">
					<span className="visually-hidden">Loading...</span>
				</Spinner>
			}
		>
			<Routes>
				<Route element={<AuthGuard />}>
					<Route path="/" element={<UniAdminDashboard />} />
					<Route path="/admins" element={<UniAdminAdmins />} />
					<Route path="/students" element={<div>B</div>} />
					<Route path="/lecturers" element={<div>C</div>} />
				</Route>
			</Routes>
		</React.Suspense>
	)
}

export default App
