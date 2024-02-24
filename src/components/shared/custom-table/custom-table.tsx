import React from 'react'
import { Table } from 'react-bootstrap'

type CustomTablePropsType = {
	tableHeaders: string[]
	children: React.ReactNode // tbody content
}
const CustomTable = ({ tableHeaders, children }: CustomTablePropsType) => {
	return (
		<Table responsive hover>
			<thead>
				<tr>
					{tableHeaders.map((header, index) => (
						<th key={index}>{header}</th>
					))}
					{/* {Array.from({ length: 12 }).map((_, index) => (
						<th key={index}>Table heading</th>
					))} */}
				</tr>
			</thead>
			{/* <tbody></tbody> */}
			{children}
		</Table>
	)
}

export default CustomTable
