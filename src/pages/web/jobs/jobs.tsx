import JobsItem from '../../../components/web/jobs/jobs-item/jobs-item'
import JobsDetailItem from '../../../components/web/jobs/jobs-detail-item/jobs-detail-item'
import { useEffect, useState } from 'react'

const Jobs = () => {
	const [selectedJob, setSelectedJob] = useState<any>()

	useEffect(() => {
		// TODO: get the jobs list
		// TODO: set 1st item as default selectedJob
	}, [])
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
					{/* TODO: map the jobs list */}
					<JobsItem item={1} setSelectedJob={setSelectedJob} />
					<JobsItem item={1} setSelectedJob={setSelectedJob} />
					<JobsItem item={1} setSelectedJob={setSelectedJob} />
					<JobsItem item={1} setSelectedJob={setSelectedJob} />
				</div>

				<JobsDetailItem jobId={selectedJob} />
			</div>
		</div>
	)
}

export default Jobs
