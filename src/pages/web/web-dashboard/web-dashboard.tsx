import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const WebDashboard = () => {
	const navigate = useNavigate()

	return (
		<div className="page">
			<Button onClick={() => navigate('/create-post')}>Create a Post</Button>
		</div>
	)
}

export default WebDashboard
