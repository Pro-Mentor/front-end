import { Card } from 'react-bootstrap'
import { timeAgo } from '../../../../utils/dateTImeHandler'

type Props = {
	item: any
	setSelectedJob: any
}

function JobsItem({ item, setSelectedJob }: Props) {
	console.log(item)

	return (
		<Card className="job-item" onClick={() => setSelectedJob(item)}>
			<div className="company-logo">
				<img src="" alt="company-logo" />
			</div>
			<div className="data">
				<div className="title">Associate Software Engineer</div>
				<div className="company-name">Digital Tech Pvt. Ltd</div>
				<div className="location">Colombo, Sri Lanka</div>
				<div className="times-ago">{timeAgo(new Date().toString())}</div>
			</div>
		</Card>
	)
}

export default JobsItem
