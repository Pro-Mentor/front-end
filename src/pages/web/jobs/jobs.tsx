import { timeAgo } from '../../../utils/dateTImeHandler'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faClock,
	faLocationPin,
	faShare,
	faSuitcase,
} from '@fortawesome/free-solid-svg-icons'
import './jobs.scss'
import { Card } from 'react-bootstrap'

const Jobs = () => {
	return (
		<div className="page jobs-page">
			<div className="top-row">
				<div className="search-bar">search</div>
				<div className="filter">
					<div className="filter-title">Job Type</div>
					<div className="filter-dropdown">dropdown</div>
				</div>
				<div className="filter">
					<div className="filter-title">Modality</div>
					<div className="filter-dropdown">dropdown</div>
				</div>
				<div className="filter">
					<div className="filter-title">Location</div>
					<div className="filter-dropdown">dropdown</div>
				</div>
			</div>
			<div className="content">
				<div className="latest-list">
					<Card className="job-item">
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
					<Card className="job-item">
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
					<Card className="job-item">
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
				</div>
				<div className="selected-job">
					<div className="selected-top-row">
						<div className="company-logo">
							<img src="" alt="company-logo" />
						</div>
						<div className="title-section">
							<div className="title">Associate Software Engineer</div>
							<div className="company-name">Digital Tech Pvt. Ltd</div>
						</div>
						<div className="times-ago">{timeAgo(new Date().toString())}</div>
						<div className="share-btn">
							<FontAwesomeIcon icon={faShare} />
						</div>
					</div>

					<div className="details-section">
						<div className="detail-item">
							<div className="detail-icon">
								<FontAwesomeIcon icon={faLocationPin} />
							</div>
							<div className="detail-detail">Colombo, Sri Lanka</div>
						</div>
						<div className="detail-item">
							<div className="detail-icon">
								<FontAwesomeIcon icon={faSuitcase} />
							</div>
							<div className="detail-detail">Remote</div>
						</div>
						<div className="detail-item">
							<div className="detail-icon">
								<FontAwesomeIcon icon={faClock} />
							</div>
							<div className="detail-detail">Full-time</div>
						</div>
					</div>

					<div className="tags-section">
						<div className="badge rounded-pill text-bg-primary">React JS</div>
						<div className="badge rounded-pill text-bg-primary">Node JS</div>
						<div className="badge rounded-pill text-bg-primary">Docker</div>
						<div className="badge rounded-pill text-bg-primary">React JS</div>
						<div className="badge rounded-pill text-bg-primary">Node JS</div>
						<div className="badge rounded-pill text-bg-primary">Docker</div>
					</div>

					<div className="description-section">
						Our Guiding Principles set the standard for how we work with one
						another. They define who we are as an organization and guide
						everything we do. By applying the same shared values that unleash
						prosperity in free societies—such as value creation, integrity,
						responsibility, free speech, and toleration—we encourage one another
						to take initiative and to challenge the status quo.
					</div>
				</div>
			</div>
		</div>
	)
}

export default Jobs
