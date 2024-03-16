import Sidebar from 'react-bootstrap-sidebar-menu'
import { useNavigate } from 'react-router-dom'
import './navbar.scss'

// icons
import navLogo from '@/assets/images/nav-logo.svg'
import NDashboard from '@/assets/images/nav-dashboard.svg'
import NStaff from '@/assets/images/nav-staff.svg'
import NStudents from '@/assets/images/nav-students.svg'
import NLecturers from '@/assets/images/nav-lecturers.svg'
import { keycloakInstant } from '../../../hooks/useAuth'

type NavItemType = {
	id: number
	icon?: string
	title: string
	path: string
	subMenu?: NavItemType[]
}

const NavbarLocal = () => {
	const theme = 'light'
	const navigate = useNavigate()

	const uniAdminNavList: NavItemType[] = [
		{
			id: 1,
			title: 'Dashboard',
			path: '/',
		},
		{
			id: 2,
			title: 'Staff',
			path: '/staff',
		},
		{
			id: 3,
			title: 'Students',
			path: '/students',
		},
		{
			id: 4,
			title: 'Lecturers',
			path: '/lecturers',
		},
	]

	// const uniStaffNavList: NavItemType[] = [
	// 	{
	// 		id: 1,
	// 		title: 'Dashboard',
	// 		path: '/admin-dashboard',
	// 	},
	// 	{
	// 		id: 3,
	// 		title: 'Students',
	// 		path: '/students',
	// 	},
	// 	{
	// 		id: 4,
	// 		title: 'Lecturers',
	// 		path: '/lecturers',
	// 	},
	// ]

	function navIconSetter(id: number) {
		switch (id) {
			case 1:
				return NDashboard
			case 2:
				return NStaff
			case 3:
				return NStudents
			case 4:
				return NLecturers
			default:
				return ''
		}
	}

	function logoutHandler() {
		const { hostname, protocol, port } = window.location
		const hrefWothoutPath =
			protocol + '//' + hostname + (port ? ':' + port : '')
		keycloakInstant.logout({ redirectUri: hrefWothoutPath })
	}

	return (
		<Sidebar defaultExpanded variant={theme} bg={theme} expand="sm">
			<Sidebar.Collapse getScrollValue={500}>
				<Sidebar.Header>
					<Sidebar.Brand>
						<img src={navLogo} alt="logo" className="logo" />
					</Sidebar.Brand>
					<Sidebar.Toggle />
				</Sidebar.Header>

				<div className="navbar-container1">
					<Sidebar.Body>
						{uniAdminNavList.map((item) => {
							return (
								<Sidebar.Nav
									key={item.id}
									data-toggle="tooltip"
									data-placement="right"
									title={item.title}
								>
									<Sidebar.Nav.Link
										eventKey={item.path}
										active={item.path === window.location.pathname}
										onSelect={() => navigate(item.path)}
									>
										<Sidebar.Nav.Icon>
											<img
												className="nav-icon"
												src={navIconSetter(item.id)}
												alt="icon"
											/>
										</Sidebar.Nav.Icon>
										<Sidebar.Nav.Title>{item.title}</Sidebar.Nav.Title>
									</Sidebar.Nav.Link>
								</Sidebar.Nav>
							)
						})}

						{/* <Sidebar.Nav.Link>
							<Sidebar.Nav.Icon>
								icon
							</Sidebar.Nav.Icon>
							<Sidebar.Nav.Title>
								title
							</Sidebar.Nav.Title>
						</Sidebar.Nav.Link>
						<Sidebar.Sub>
							<Sidebar.Sub.Toggle>
								<Sidebar.Nav.Icon />
								<Sidebar.Nav.Title>
								</Sidebar.Nav.Title>
							</Sidebar.Sub.Toggle>
							<Sidebar.Sub.Collapse>
								<Sidebar.Nav>
									<Sidebar.Nav.Link>
										<Sidebar.Nav.Icon>
										</Sidebar.Nav.Icon>
										<Sidebar.Nav.Title>
										</Sidebar.Nav.Title>
									</Sidebar.Nav.Link>
								</Sidebar.Nav>
							</Sidebar.Sub.Collapse>
						</Sidebar.Sub> */}
					</Sidebar.Body>

					<div className="bottom-nav-container">
						<Sidebar.Nav
							data-toggle="tooltip"
							data-placement="right"
							title="Logout"
						>
							<Sidebar.Nav.Link onClick={logoutHandler}>
								<Sidebar.Nav.Icon>
									<img className="nav-icon" src={NDashboard} alt="icon" />
								</Sidebar.Nav.Icon>
								<Sidebar.Nav.Title>Logout</Sidebar.Nav.Title>
							</Sidebar.Nav.Link>
						</Sidebar.Nav>
					</div>
					<div className="powered-by-title">Powered by ProMentor © 2023</div>
				</div>
			</Sidebar.Collapse>
		</Sidebar>
	)
}

export default NavbarLocal
