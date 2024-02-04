import React from 'react'
import SidebarMenu from 'react-bootstrap-sidebar-menu'

const Navbar = () => {
	return (
		<SidebarMenu defaultExpanded>
			<SidebarMenu.Collapse>
				<SidebarMenu.Header>
					<SidebarMenu.Brand>icon</SidebarMenu.Brand>
					<SidebarMenu.Toggle />
				</SidebarMenu.Header>
				<SidebarMenu.Body>
					<SidebarMenu.Nav>
						<SidebarMenu.Nav.Link>
							<SidebarMenu.Nav.Icon>
								{/* menu item icon */}
								icon
							</SidebarMenu.Nav.Icon>
							<SidebarMenu.Nav.Title>
								{/* menu item title */}
								title
							</SidebarMenu.Nav.Title>
						</SidebarMenu.Nav.Link>
						<SidebarMenu.Sub>
							<SidebarMenu.Sub.Toggle>
								<SidebarMenu.Nav.Icon />
								<SidebarMenu.Nav.Title>
									{/* sub menu item title */}
								</SidebarMenu.Nav.Title>
							</SidebarMenu.Sub.Toggle>
							<SidebarMenu.Sub.Collapse>
								<SidebarMenu.Nav>
									<SidebarMenu.Nav.Link>
										<SidebarMenu.Nav.Icon>
											{/* sum menu item icon */}
										</SidebarMenu.Nav.Icon>
										<SidebarMenu.Nav.Title>
											{/* sub menu item title */}
										</SidebarMenu.Nav.Title>
									</SidebarMenu.Nav.Link>
								</SidebarMenu.Nav>
							</SidebarMenu.Sub.Collapse>
						</SidebarMenu.Sub>
					</SidebarMenu.Nav>
				</SidebarMenu.Body>
			</SidebarMenu.Collapse>
		</SidebarMenu>
	)
}

export default Navbar
