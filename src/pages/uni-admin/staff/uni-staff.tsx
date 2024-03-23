import { Button, Modal, Spinner, Toast } from 'react-bootstrap'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import PageHeader from '../../../components/shared/page-header/page-header'
import './uni-staff.scss'
import { useGetStaffTableDetails } from '../../../hooks/uni-admin/staff/useGetStaffTableDetails'
import { useEffect, useState } from 'react'
import AddNewStaff, {
	FormData,
} from '../../../components/uni-admin/staff/add-new-staff/add-new-staff'
import DeactivateStaff, {
	DeactivateItem,
} from '../../../components/uni-admin/staff/deactivate-staff/deactivate-staff'
import { useCreateStaff } from '../../../hooks/uni-admin/staff/useCreateStaff'
import { isIGlobalError } from '../../../utils/isGlobalError'
import { toast } from 'react-toastify'

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
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateStaffList, setDeactivateStaffList] = useState<
		DeactivateItem[]
	>([])
	const {
		setCreateStaffRequest,
		createStaffResponse,
		isLoading_createStaff,
		isValidating_createStaff,
		error_createStaff,
		setIsRequestReady_createStaff,
	} = useCreateStaff()

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
	const addNewConfirmHandler = (data: FormData) => {
		setIsLoading(true)
		setCreateStaffRequest(data)
		setIsRequestReady_createStaff(true)
		// setIsAddNewModalOpen(false)
	}

	// deactivate staff confirmed
	const deactivateConfirmHandler = () => {
		setIsDeactivateModalOpen(false)
	}

	useEffect(() => {
		// console.log(createStaffResponse)
		if (createStaffResponse) {
			setIsLoading(false)
			toast.success('Staff created successfully.')
			setIsAddNewModalOpen(false)
		}
	}, [createStaffResponse])

	useEffect(() => {
		// console.log(error_createStaff)
		if (
			error_createStaff !== undefined &&
			error_createStaff !== null &&
			typeof error_createStaff !== 'string'
		) {
			setIsLoading(false)
			toast.error(error_createStaff.errors[0].message)
		}
	}, [error_createStaff])
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

			{/* Loader overlay */}
			<Modal show={isLoading} backdrop="static" keyboard={false} centered>
				<Modal.Body className="text-center">
					<Spinner animation="border" role="status" />
					<p>Creating staff member...</p>
				</Modal.Body>
			</Modal>

			{/* Toast
			<Toast
				show={showToast}
				onClose={toggleToast}
				delay={5000}
				animation
				autohide
			>
				<Toast.Body>{toastMessage}</Toast.Body>
			</Toast> */}
		</>
	)
}

export default UniStaff
