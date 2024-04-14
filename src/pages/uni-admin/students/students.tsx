import { Button, Form, FormControl, Modal, Spinner } from 'react-bootstrap'
import PageHeader from '../../../components/shared/page-header/page-header'
import { useEffect, useState } from 'react'
import CustomTable from '../../../components/shared/custom-table/custom-table'
import AddNewStudents from '../../../components/uni-admin/students/add-new-students/add-new-students'
import {
	GetStudentsResponse,
	StudentCreateRequest,
} from '@promentor-app/shared-lib'
import { useCreateStudent } from '../../../hooks/uni-admin/students/useCreateStudent'
import { useGetStudentsTableDetails } from '../../../hooks/uni-admin/students/useGetStudentsTableDetails'
import { useUpdateStudent } from '../../../hooks/uni-admin/students/useUpdateStudent'
import { toast } from 'react-toastify'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { useForm } from 'react-hook-form'

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
	const { register, handleSubmit } = useForm<{ search: string }>()

	const {
		setCreateStudentRequest,
		createStudentResponse,
		isLoading_createStudent,
		isValidating_createStudent,
		error_createStudent,
		setIsRequestReady_createStudent,
	} = useCreateStudent()

	const {
		getStudentsResponse,
		isLoading_getStudents,
		isValidating_getStudents,
		error_getStudents,
		mutate_getStudents,
		setSearch_getStudents,
	} = useGetStudentsTableDetails()

	const {
		setUpdateStudentsRequest,
		updateStudentsResponse,
		isLoading_updateStudent,
		isValidating_updateStudent,
		error_updateStudent,
		setStudentId,
		setIsRequestReady_updateStudent,
		mutate_updateStudent,
	} = useUpdateStudent()

	const searchHandler = (data: { search: string }) => {
		console.log(data)

		if (data.search !== null && data.search !== undefined) {
			setSearch_getStudents(data.search)
			mutate_getStudents()
		}
	}

	const keyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') handleSubmit(searchHandler)()
	}

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
		setCreateStudentRequest(data)
		setIsRequestReady_createStudent(true)
	}

	// convert students details response into table row data
	const studentsTableDataSetter = (response: GetStudentsResponse[]) => {
		const lecList: StudentItem[] = response.map((item) => {
			return {
				id: item.id,
				name: item?.firstName + ' ' + item?.lastName || '-',
				username: item.username,
				email: item.email,
				status: item.enabled ? 'Active' : 'Inactive',
			}
		})
		setStudentsTableList(lecList)
	}

	useEffect(() => {
		mutate_getStudents()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	useEffect(() => {
		if (createStudentResponse) {
			toast.success('Student created successfully.')
			mutate_getStudents()
			setIsAddNewModalOpen(false)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [createStudentResponse])

	useEffect(() => {
		if (getStudentsResponse && getStudentsResponse.length > 0) {
			studentsTableDataSetter(getStudentsResponse)
		} else if (getStudentsResponse && getStudentsResponse.length === 0) {
			setStudentsTableList([])
		}
	}, [getStudentsResponse])

	useEffect(() => {
		errorDisplayHandler(error_createStudent)
		errorDisplayHandler(error_getStudents)
		errorDisplayHandler(error_updateStudent)
	}, [error_createStudent, error_getStudents, error_updateStudent])

	useEffect(() => {
		if (
			isLoading_createStudent ||
			isLoading_getStudents ||
			isLoading_updateStudent ||
			isValidating_createStudent ||
			isValidating_getStudents ||
			isValidating_updateStudent
		) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_createStudent,
		isLoading_getStudents,
		isLoading_updateStudent,
		isValidating_createStudent,
		isValidating_getStudents,
		isValidating_updateStudent,
	])

	return (
		<>
			<div className="page uni-students-page">
				<PageHeader title="Students">
					<>
						<Form onSubmit={handleSubmit(searchHandler)}>
							<FormControl
								type="text"
								placeholder="Search"
								className="mr-sm-2"
								{...register('search')}
								onKeyDown={keyDownHandler} // Listen for Enter key press
							/>
						</Form>
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
				isFormReset={createStudentResponse ? true : false}
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
