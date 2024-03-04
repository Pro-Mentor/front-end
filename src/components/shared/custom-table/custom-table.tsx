import React from 'react'
import { Form, Table } from 'react-bootstrap'
import './custom-table.scss'

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
		<div className="custom-table">
			<div className="select-all-row">
				<Form.Check
					type="checkbox"
					id="custom-table-select-all"
					label="Select All"
				/>
				<div className="total-count-container">
					Total: <span>{tableData?.length}</span>
				</div>
			</div>
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
										// className={rowClickHandler ? 'clickable-row' : ''}
									>
										<td key={index}>
											<Form.Check
												type="checkbox"
												id={`custom-table-select-${index}`}
											/>
										</td>
										{Object.entries(item).map(([key, value]) => (
											<td key={key}>{value as string}</td>
										))}
									</tr>
								)
							})}
					</tbody>
				)}
			</Table>
		</div>
	)
}

export default CustomTable
