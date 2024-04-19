/* eslint-disable react-hooks/exhaustive-deps */
import JobsItem from '../../../components/web/jobs/jobs-item/jobs-item'
import JobsDetailItem from '../../../components/web/jobs/jobs-detail-item/jobs-detail-item'
import { useEffect, useState } from 'react'
import { Button, Modal, Spinner } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import { SessionHandler } from '../../../utils/session-handler'
import './jobs.scss'
import {
	GetJobListResponse,
	useGetJobList,
} from '../../../hooks/web/jobs/useGetJobList'
import { useGetJob } from '../../../hooks/web/jobs/useGetJob'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'

const sessionHandler = new SessionHandler()

const checkUser = () => {
	const user = sessionHandler.getSession('user')

	if (user === 'lecture' || user === 'user') return true
	else return false
}

const Jobs = () => {
	const { jobId } = useParams()
	const navigate = useNavigate()
	const [isLoading, setIsLoading] = useState(false)
	const isCreateVisible = checkUser()
	const [selectedJob, setSelectedJob] = useState<GetJobListResponse>()
	const {
		isLoading_getJobs,
		isValidating_getJobs,
		error_getJobs,
		setLocationId_getJobs,
		setSearch_getJobs,
		setTagId_getJobs,
		setModalityId_getJobs,
		setTypeId_getJobs,
		mutate_getJobs,
		getJobsListResponse,
	} = useGetJobList()
	const {
		isLoading_getJob,
		isValidating_getJob,
		error_getJob,
		getJobResponse,
		setJobId_getJob,
		mutate_getJob,
	} = useGetJob()

	const jobItemSelectHandler = (item: GetJobListResponse) => {
		navigate(`/jobs/${item.id}`)
		setSelectedJob(item)
	}

	useEffect(() => {
		mutate_getJobs()
	}, [])

	useEffect(() => {
		if (jobId) {
			setJobId_getJob(jobId)
			mutate_getJob()
		}
	}, [jobId])

	useEffect(() => {
		if (getJobResponse) {
			setSelectedJob(getJobResponse)
		}
	}, [getJobResponse])

	useEffect(() => {
		if (getJobsListResponse && !jobId) {
			setSelectedJob(getJobsListResponse[0])
			navigate(`/jobs/${getJobsListResponse[0].id}`)
		}
	}, [getJobsListResponse, jobId])

	useEffect(() => {
		if (
			isLoading_getJob ||
			isLoading_getJobs ||
			isValidating_getJob ||
			isValidating_getJobs
		) {
			setIsLoading(true)
		} else setIsLoading(false)
	}, [
		isLoading_getJob,
		isLoading_getJobs,
		isValidating_getJob,
		isValidating_getJobs,
	])

	useEffect(() => {
		errorDisplayHandler(error_getJob)
		errorDisplayHandler(error_getJobs)
	}, [error_getJob, error_getJobs])

	return (
		<>
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

					{isCreateVisible && (
						<Button onClick={() => navigate('/create-job')}>
							Create Job Post
						</Button>
					)}
				</div>
				<div className="content">
					<div className="latest-list">
						{getJobsListResponse &&
							getJobsListResponse.map((job) => {
								return (
									<JobsItem
										item={job}
										setSelectedJob={jobItemSelectHandler}
										key={job.id}
									/>
								)
							})}
					</div>

					{selectedJob && <JobsDetailItem jobDetails={selectedJob} />}
				</div>
			</div>

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
					{/* <p>{loaderMsg}</p> */}
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Jobs
