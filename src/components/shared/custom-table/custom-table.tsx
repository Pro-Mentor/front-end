import React from 'react'
import { Table } from 'react-bootstrap'

function CustomTable<dataRowType extends Record<string, unknown>>({
	tableHeaders,
	tableData,
	children,
	rowClickHandler,
}: {
	tableHeaders?: string[]
	tableData?: dataRowType[]
	children?: React.ReactNode
	rowClickHandler?: (item: dataRowType) => void
}) {
	return (
		<Table responsive hover>
			{tableHeaders && (
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
			)}

			{/* use for data rows with custom buttons set */}
			{children ? (
				children
			) : (
				<tbody>
					{tableData &&
						tableData.map((item, index) => {
							return (
								<tr
									key={index}
									onClick={
										rowClickHandler ? () => rowClickHandler(item) : undefined
									}
									style={rowClickHandler ? { cursor: 'pointer' } : {}}
								>
									{Object.entries(item).map(([key, value]) => (
										<td key={key}>{value as string}</td>
									))}
								</tr>
							)
						})}
				</tbody>
			)}
		</Table>
	)
}

export default CustomTable
