import { Button, Modal } from 'react-bootstrap'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import PageHeader from '../../../components/shared/page-header/page-header'
import './uni-staff.scss'
import { useGetStaffTableDetails } from '../../../hooks/uni-admin/staff/useGetStaffTableDetails'
import { useState } from 'react'
import AddNewStaff from '../../../components/uni-admin/staff/add-new-staff/add-new-staff'
import DeactivateStaff, {
	DeactivateItem,
} from '../../../components/uni-admin/staff/deactivate-staff/deactivate-staff'

type StaffItem = {
	name: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Email', 'Status']
const staffList: StaffItem[] = [
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

const UniStaff = () => {
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateStaffList, setDeactivateStaffList] = useState<
		DeactivateItem[]
	>([])

	// const { staffData, isLoading, isValidating, error } =
	// 	useGetStaffTableDetails()

	// if (error) return <div>Failed to load</div>
	// if (isLoading || isValidating) return <div>Loading...</div>
	// if (typeof staffData === 'string') return <div>Error!!!</div>

	// open add new staff modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open deactivate staff modal
	const deactivateHandler = () => {
		setIsDeactivateModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
	}

	// add new staff confirmed
	const addNewConfirmHandler = () => {
		setIsAddNewModalOpen(false)
	}

	// deactivate staff confirmed
	const deactivateConfirmHandler = () => {
		setIsDeactivateModalOpen(false)
	}

	return (
		<>
			<div className="page uni-staff-page">
				<PageHeader title="Staff">
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
					<CustomTable<StaffItem>
						tableHeaders={tableHeaders}
						tableData={staffList}
					/>
				</div>
			</div>

			{/* add new modal */}
			<AddNewStaff
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
			/>

			{/* deactivate confirm modal */}
			<DeactivateStaff
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateStaffList={deactivateStaffList}
			/>
		</>
	)
}

export default UniStaff
