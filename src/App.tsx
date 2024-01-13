import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { AuthGuard } from './AuthGuard'

function App() {
	return (
		<React.Suspense fallback={<div>Loading...</div>}>
			<Routes>
				<Route element={<AuthGuard />}>
					<Route path="/a" element={<div>A</div>} />
					<Route path="/b" element={<div>B</div>} />
					<Route path="/c" element={<div>C</div>} />
					<Route path="/" element={<div>D</div>} />
				</Route>
			</Routes>
		</React.Suspense>
	)
}

export default App
