import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export type DeactivateItem = {
	name: string
	email: string
	id: string
}

type Props = {
	isDeactivateModalOpen: boolean
	modalCloseHandler: () => void
	deactivateConfirmHandler: () => void
	deactivateList: DeactivateItem[]
}

const DeactivateLecturer = ({
	isDeactivateModalOpen,
	modalCloseHandler,
	deactivateConfirmHandler,
	deactivateList,
}: Props) => {
	return (
		<Modal show={isDeactivateModalOpen} onHide={modalCloseHandler}>
			<Modal.Header closeButton>
				<Modal.Title>Deactivate Lecturer Account</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<div className="">
					Are you sure you want to deactive following selected lecturer
					accounts?
				</div>
				<div className="">
					{deactivateList &&
						deactivateList.map((lec, index) => (
							<div key={index} className="">
								<div className="">{lec.name}</div>
								<div className="">{lec.email}</div>
							</div>
						))}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={modalCloseHandler}>
					Cancel
				</Button>
				<Button variant="primary" onClick={deactivateConfirmHandler}>
					Deactivate
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeactivateLecturer
