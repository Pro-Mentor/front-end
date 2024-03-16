import { Button } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import { useState } from 'react'
import AddNewLecturer from '../../../components/uni-admin/lecturers/add-new-lecturer/add-new-lecturer'
import DeactivateLecturer, {
	DeactivateItem,
} from '../../../components/uni-admin/lecturers/deactivate-lecturer/deactivate-lecturer'

type LecturerItem = {
	name: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Email', 'Status']
const lecturerList: LecturerItem[] = [
	{
		name: 'John Doe',
		email: 'john@gmail.com',
		status: 'Active',
	},
	{
		name: 'John Doe',
		email: 'john@gmail.com',
		status: 'Active',
	},
	{
		name: 'John Doe',
		email: 'john@gmail.com',
		status: 'Active',
	},
	{
		name: 'John Doe',
		email: 'john@gmail.com',
		status: 'Active',
	},
]

const Lecturers = () => {
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateList, setDeactivateList] = useState<DeactivateItem[]>([])

	// open add new lecturer modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open deactivate lecturer modal
	const deactivateHandler = () => {
		setIsDeactivateModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
	}

	// add new lecturer confirmed
	const addNewConfirmHandler = () => {
		setIsAddNewModalOpen(false)
	}

	// deactivate lecturer confirmed
	const deactivateConfirmHandler = () => {
		setIsDeactivateModalOpen(false)
	}

	return (
		<>
			<div className="page uni-lecturer-page">
				<PageHeader title="Lecturers">
					<>
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						<Button variant="primary" onClick={deactivateHandler}>
							Deactivate
						</Button>
					</>
				</PageHeader>
				<div className="">
					<CustomTable<LecturerItem>
						tableHeaders={tableHeaders}
						tableData={lecturerList}
					/>
				</div>
			</div>

			{/* add new modal */}
			<AddNewLecturer
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
			/>

			{/* deactivate confirm modal */}
			<DeactivateLecturer
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateList={deactivateList}
			/>
		</>
	)
}

export default Lecturers
