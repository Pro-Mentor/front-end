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
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { GetResourceManagersResponse } from '@promentor-app/shared-lib'

type StaffItem = {
	id: string
	name: string
	username: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Username', 'Email', 'Status']

const UniStaff = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [loaderMsg, setLoaderMsg] = useState('')
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	const [deactivateStaffList, setDeactivateStaffList] = useState<
		DeactivateItem[]
	>([])
	const [staffTableList, setStaffTableList] = useState<StaffItem[]>([])
	const {
		setCreateStaffRequest,
		createStaffResponse,
		isLoading_createStaff,
		isValidating_createStaff,
		error_createStaff,
		setIsRequestReady_createStaff,
	} = useCreateStaff()

	const {
		getStaffResponse,
		isLoading_getStaff,
		isValidating_getStaff,
		error_getStaff,
	} = useGetStaffTableDetails()

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
		// setIsLoading(true)
		setCreateStaffRequest(data)
		setIsRequestReady_createStaff(true)
		// setIsAddNewModalOpen(false)
	}

	// deactivate staff confirmed
	const deactivateConfirmHandler = () => {
		setIsDeactivateModalOpen(false)
	}

	// convert staff details response into table row data
	const staffTableDataSetter = (response: GetResourceManagersResponse[]) => {
		const staffList: StaffItem[] = response.map((item) => {
			return {
				id: item.id,
				name: item?.firstName + ' ' + item?.lastName || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}
		})
		// console.log(staffList)

		setStaffTableList(staffList)
	}

	useEffect(() => {
		// console.log(createStaffResponse)
		if (createStaffResponse) {
			// setIsLoading(false)
			toast.success('Staff created successfully.')
			setIsAddNewModalOpen(false)
		}
	}, [createStaffResponse])

	useEffect(() => {
		// console.log(getStaffResponse)
		if (getStaffResponse && getStaffResponse.length > 0) {
			staffTableDataSetter(getStaffResponse)
		}
	}, [getStaffResponse])

	useEffect(() => {
		errorDisplayHandler(error_createStaff)
		errorDisplayHandler(error_getStaff)
	}, [error_createStaff, error_getStaff])

	useEffect(() => {
		if (
			isLoading_createStaff ||
			isLoading_getStaff ||
			isValidating_createStaff ||
			isValidating_getStaff
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createStaff,
		isLoading_getStaff,
		isValidating_createStaff,
		isValidating_getStaff,
	])

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
					{staffTableList && (
						<CustomTable<StaffItem>
							tableHeaders={tableHeaders}
							tableData={staffTableList}
						/>
					)}
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
					<p>{loaderMsg}</p>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default UniStaff
