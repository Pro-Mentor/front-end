import { Button, Modal } from 'react-bootstrap'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import PageHeader from '../../../components/shared/page-header/page-header'
import './uni-staff.scss'
import { useGetStaffTableDetails } from '../../../hooks/uni-admin/staff/useGetStaffTableDetails'
import { useState } from 'react'

type StaffItem = {
	name: string
	email: string
	status: string
}

const tableHeaders = ['Name', 'Email', 'Status', '']
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

	// const { staffData, isLoading, isValidating, error } =
	// 	useGetStaffTableDetails()

	// if (error) return <div>Failed to load</div>
	// if (isLoading || isValidating) return <div>Loading...</div>
	// if (typeof staffData === 'string') return <div>Error!!!</div>

	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	const deactivateHandler = () => {
		setIsDeactivateModalOpen(true)
	}

	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
	}

	const addNewConfirmHandler = () => {
		setIsAddNewModalOpen(false)
	}

	const deactivateConfirmHandler = () => {
		setIsDeactivateModalOpen(false)
	}

	return (
		<>
			<div className="page uni-staff-page">
				<PageHeader title="Staff">
					<div className="">
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						<Button variant="danger" onClick={deactivateHandler}>
							Deactivate
						</Button>
					</div>
				</PageHeader>
				<div className="">
					<CustomTable<StaffItem>
						tableHeaders={tableHeaders}
						tableData={staffList}
					/>
				</div>
			</div>

			{/* add new modal */}
			<Modal show={isAddNewModalOpen} onHide={modalCloseHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={modalCloseHandler}>
						Close
					</Button>
					<Button variant="primary" onClick={addNewConfirmHandler}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			{/* deactivate confirm modal */}
			<Modal show={isDeactivateModalOpen} onHide={modalCloseHandler}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={modalCloseHandler}>
						Close
					</Button>
					<Button variant="primary" onClick={deactivateConfirmHandler}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	)
}

export default UniStaff
