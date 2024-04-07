import { Button, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import { useState } from 'react'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import AddNewStudents from '../../../components/uni-admin/students/add-new-students/add-new-students'
import { StudentCreateRequest } from '@promentor-app/shared-lib'

type StudentItem = {
	id: string
	name: string
	username: string
	email: string
	status: string
}

const tableHeaders = ['', 'Name', 'Username', 'Email', 'Status']

const Students = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [isAddNewModalOpen, setIsAddNewModalOpen] = useState(false)
	const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false)
	// const [deactivateList, setDeactivateList] = useState<DeactivateItem[]>([])
	const [studentsTableList, setStudentsTableList] = useState<StudentItem[]>([])
	const [selectedStudentsList, setSelectedStudentsList] = useState<
		StudentItem[]
	>([])

	// open add new lecturer modal
	const addNewHandler = () => {
		setIsAddNewModalOpen(true)
	}

	// close both add and deactivate modals
	const modalCloseHandler = () => {
		setIsAddNewModalOpen(false)
		setIsDeactivateModalOpen(false)
	}

	// open deactivate lecturer modal
	// const deactivateHandler = () => {
	// 	deactivateListSetter(selectedLecturerList)
	// 	setIsDeactivateModalOpen(true)
	// }

	// convert table row data into deactivate list data
	// const deactivateListSetter = (list: StudentItem[]) => {
	// 	const dList: DeactivateItem[] = list.map((item) => {
	// 		return {
	// 			id: item.id,
	// 			email: item.email,
	// 			name: item.name,
	// 		}
	// 	})

	// 	setDeactivateList(dList)
	// }

	// select data row in the table
	const selectHandler = (item: StudentItem) => {}

	// add new student confirmed
	const addNewConfirmHandler = (data: StudentCreateRequest) => {
		console.log(data)
		// setCreateStudentRequest(data)
		// setIsRequestReady_createStudent(true)
	}

	return (
		<>
			<div className="page uni-lecturer-page">
				<PageHeader title="Students">
					<>
						<Button variant="primary" onClick={addNewHandler}>
							Add New
						</Button>
						{/* <Button
							variant="primary"
							onClick={deactivateHandler}
							disabled={!(selectedStudentsList.length > 0)}
						>
							Deactivate
						</Button> */}
					</>
				</PageHeader>
				<div className="">
					<CustomTable<StudentItem>
						tableHeaders={tableHeaders}
						tableData={studentsTableList}
						rowClickHandler={selectHandler}
						selectedDataRows={selectedStudentsList}
					/>
				</div>
			</div>

			{/* add new modal */}
			<AddNewStudents
				isAddNewModalOpen={isAddNewModalOpen}
				modalCloseHandler={modalCloseHandler}
				addNewConfirmHandler={addNewConfirmHandler}
			/>

			{/* deactivate confirm modal */}
			{/* <DeactivateLecturer
				isDeactivateModalOpen={isDeactivateModalOpen}
				modalCloseHandler={modalCloseHandler}
				deactivateConfirmHandler={deactivateConfirmHandler}
				deactivateList={deactivateList}
			/> */}

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

export default Students
