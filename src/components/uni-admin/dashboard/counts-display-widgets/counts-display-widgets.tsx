import './counts-display-widgets.scss'

// icons
import IEvents from '@/assets/images/events.svg'
import Iadmins from '@/assets/images/nav-admin.svg'
import Istudents from '@/assets/images/nav-students.svg'
import ILecturers from '@/assets/images/nav-lecturers.svg'
import IStaff from '@/assets/images/nav-staff.svg'

const CountsDisplayWidgets = () => {
	const countsList = [
		{
			id: 1,
			icon: Iadmins,
			title: 'Admins',
			count: 5,
		},
		{
			id: 2,
			icon: IStaff,
			title: 'Staff',
			count: 12,
		},
		{
			id: 3,
			icon: Istudents,
			title: 'Students',
			count: 2548,
		},
		{
			id: 4,
			icon: ILecturers,
			title: 'Lecturers',
			count: 30,
		},
		{
			id: 5,
			icon: IEvents,
			title: 'Events',
			count: 15,
		},
	]

	return (
		<div className="counts-display">
			{countsList.map((count) => {
				return (
					<div className="count-container" key={count.id}>
						<div className="icon">
							<img src={count.icon} alt="icon" />
						</div>
						<div className="text">
							<div className="text-title">{count.title}</div>
							<h3 className="text-number">{count.count}</h3>
						</div>
					</div>
				)
			})}
		</div>
	)
}

export default CountsDisplayWidgets
