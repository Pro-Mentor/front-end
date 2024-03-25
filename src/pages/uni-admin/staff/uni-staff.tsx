/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Spinner } from 'react-bootstrap'
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
import { useUpdateStaff } from '../../../hooks/uni-admin/staff/useUpdateStaff'

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
	const [selectedStaffList, setSelectedStaffList] = useState<StaffItem[]>([])

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
		mutate_getStaff,
	} = useGetStaffTableDetails()

	const {
		setUpdateStaffRequest,
		updateStaffResponse,
		isLoading_updateStaff,
		isValidating_updateStaff,
		error_updateStaff,
		setStaffId,
		setIsRequestReady_updateStaff,
		mutate_updateStaff,
	} = useUpdateStaff()

	// open add new staff modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// open deactivate staff modal
	const deactivateHandler = () => {
		deactivateListSetter(selectedStaffList)
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
	const deactivateConfirmHandler = (list: DeactivateItem[]) => {
		console.log(list)

		list.forEach((item) => {
			setStaffId(item.id)
			setUpdateStaffRequest({
				enabled: false,
				email: item.email,
			})
			setIsRequestReady_updateStaff(true)
			mutate_updateStaff()
		})

		setIsDeactivateModalOpen(false)
	}

	// convert table row data into deactivate list data
	const deactivateListSetter = (list: StaffItem[]) => {
		const dList: DeactivateItem[] = list.map((item) => {
			return {
				id: item.id,
				email: item.email,
				name: item.name,
			}
		})
		// console.log(staffList)

		setDeactivateStaffList(dList)
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

	// select data row in the table
	const selectHandler = (item: StaffItem) => {
		if (selectedStaffList.some((selectedUser) => selectedUser.id === item.id)) {
			// If already selected, remove from list
			setSelectedStaffList(
				selectedStaffList.filter((selectedUser) => selectedUser.id !== item.id)
			)
		} else {
			// If not selected, add to list
			setSelectedStaffList([...selectedStaffList, item])
		}
	}

	useEffect(() => {
		// console.log(createStaffResponse)
		if (createStaffResponse) {
			toast.success('Staff created successfully.')
			mutate_getStaff()
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
		if (updateStaffResponse) {
			toast.info('Selected staff accounts deactivated successfully.')
			setSelectedStaffList([])
			setDeactivateStaffList([])
			mutate_getStaff()
		}
	}, [updateStaffResponse])

	useEffect(() => {
		errorDisplayHandler(error_createStaff)
		errorDisplayHandler(error_getStaff)
		errorDisplayHandler(error_updateStaff)
	}, [error_createStaff, error_getStaff, error_updateStaff])

	useEffect(() => {
		if (
			isLoading_createStaff ||
			isLoading_getStaff ||
			isValidating_createStaff ||
			isValidating_getStaff ||
			isLoading_updateStaff ||
			isValidating_updateStaff
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
		isLoading_updateStaff,
		isValidating_updateStaff,
	])

	return (
		<>
			<div className="page uni-staff-page">
				<PageHeader title="Staff">
					<>
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						<Button
							variant="primary"
							onClick={deactivateHandler}
							disabled={!(selectedStaffList.length > 0)}
						>
							Deactivate
						</Button>
					</>
				</PageHeader>
				<div className="">
					{staffTableList && (
						<CustomTable<StaffItem>
							tableHeaders={tableHeaders}
							tableData={staffTableList}
							rowClickHandler={selectHandler}
							selectedDataRows={selectedStaffList}
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
