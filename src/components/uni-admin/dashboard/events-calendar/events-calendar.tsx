import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import './events-calendar.scss'

const localizer = momentLocalizer(moment) // or globalizeLocalizer

const EventsCalendar = () => {
	return (
		<div className="calendar-container">
			<Calendar
				localizer={localizer}
				// events={myEventsList}
				startAccessor="start"
				endAccessor="end"
			/>
		</div>
	)
}

export default EventsCalendar
