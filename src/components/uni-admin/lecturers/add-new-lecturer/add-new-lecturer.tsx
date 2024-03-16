import React from 'react'
import { Button, Modal } from 'react-bootstrap'

type Props = {
	isAddNewModalOpen: boolean
	modalCloseHandler: () => void
	addNewConfirmHandler: () => void
}

const AddNewLecturer = ({
	isAddNewModalOpen,
	modalCloseHandler,
	addNewConfirmHandler,
}: Props) => {
	return (
		<Modal show={isAddNewModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Add Lecturer</Modal.Title>
			</Modal.Header>
			<Modal.Body>{/* add form */}</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={modalCloseHandler}>
					Close
				</Button>
				<Button variant="primary" onClick={addNewConfirmHandler}>
					Add Lecturer
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddNewLecturer
