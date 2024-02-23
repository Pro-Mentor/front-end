import CountsDisplayWidgets from '../../../components/uni-admin/dashboard/counts-display-widgets/counts-display-widgets'
import EventsCalendar from '../../../components/uni-admin/dashboard/events-calendar/events-calendar'
import EventsChart from '../../../components/uni-admin/dashboard/events-chart/events-chart'
import JobPostsChart from '../../../components/uni-admin/dashboard/job-posts-chart/job-posts-chart'
import './uni-admin-dashboard.scss'

const UniAdminDashboard = () => {
	return (
		<div className="page uni-admin-dashboard">
			<div className="left-container">
				<h3 className="welcome-text">Welcome, Admin!</h3>
				<div className="charts-container">
					<div className="job-posts-chart">
						<JobPostsChart />
					</div>
					<div className="events-chart">
						<EventsChart />
					</div>
				</div>
				<div className="events-calendar">
					<EventsCalendar />
				</div>
			</div>

			<div className="right-container">
				<CountsDisplayWidgets />
			</div>
		</div>
	)
}

export default UniAdminDashboard
