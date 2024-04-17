
import PageHeader from '../../../components/shared/page-header/page-header'
import { Button, Modal, Spinner, Accordion, Form } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { GetSkillListResponse, useGetSkills } from '../../../hooks/web/career-guide/useGetSkills'
import { useEffect, useState } from 'react'
import { errorDisplayHandler } from '../../../utils/errorDisplayHandler'
import { CareerGuideResponse, usePostCareerGuide } from '../../../hooks/web/career-guide/usePostCareerGuide'

export interface SelectSkillsFormData {
	skills?: any | string[]
}

const CareerGuide = () => {
	const [isLoading, setIsLoading] = useState(false)
	const [career, setCareer] = useState("")
	const [guides, setGuides] = useState<CareerGuideResponse[]>([])
	const [skills, setSkills] = useState<GetSkillListResponse[]>([])
	const { handleSubmit, control } = useForm<SelectSkillsFormData>()


	const {
		setGetCareerPathRequest,
		getCareerPathResponse,
		isLoading_getCareerPath,
		isValidating_getCareerPath,
		error_getCareerPath,
		setIsReqeustReady_getCareerPath,
        mutate_getCareerPath
	} = usePostCareerGuide()

	const {
		getSkillsResponse,
		isLoading_getSkills,
		isValidating_getSkills,
		error_getSkills
	} = useGetSkills()

	const onSubmit: SubmitHandler<SelectSkillsFormData> = (data) => {
		console.log(Object.keys(data.skills))
		const skillIdList = Object.keys(data.skills)
		const skillList = skills.flatMap(category => {
			return category.category
		})

		const selectedSkills = skillIdList?.map((skillId: any) => {
			console.log(data.skills[skillId], skillId)
			if (data.skills[skillId]) {
				return skillList.find(skill => skill.id == skillId)
			}
			return;
		}).filter(item => !!item).reduce((acc, current) => acc ? (acc + (current?.value ? "," + current?.value : "")) : (current?.value ? current.value : ""), "");

		setGetCareerPathRequest({
			skills: selectedSkills,
		})
		setIsReqeustReady_getCareerPath(true);
		mutate_getCareerPath()

	}

	useEffect(() => {
		if (getCareerPathResponse) {
			setCareer(getCareerPathResponse.job)
			setGuides(getCareerPathResponse.guides)
		}
	}, [getCareerPathResponse])

	useEffect(() => {
		if (getSkillsResponse && getSkillsResponse.length > 0) {
			setSkills(getSkillsResponse)
		} else if (getSkillsResponse && getSkillsResponse.length === 0) {
			setSkills([])
		}
	}, [getSkillsResponse])

	useEffect(() => {
		errorDisplayHandler(error_getSkills)
		errorDisplayHandler(error_getCareerPath)
	}, [error_getSkills, error_getCareerPath])

	useEffect(() => {
		if (isLoading_getSkills || 
			isValidating_getSkills ||
			isLoading_getCareerPath ||
			isValidating_getCareerPath) {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [
		isLoading_getSkills, 
		isValidating_getSkills,
		isLoading_getCareerPath,
		isValidating_getCareerPath,
	])

	return (
		<>
		<div>
			<PageHeader title="Career Guide" />
			<div>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group className="mb-3" controlId="skills">
						<Accordion defaultActiveKey={['0']} alwaysOpen>
							{skills?.map((item, index) => (
								item.category && item.category.length > 0 && (<Accordion.Item eventKey={index.toString()} key={index}>
									<Accordion.Header>{item.value}</Accordion.Header>
									<Accordion.Body>
										{
											item.category.map((skill) => (
												<Form.Check
													inline
													label={skill.value}
													key={skill.id}
													{...control.register(`skills.${skill.id}`)}
												/>
											))}
									</Accordion.Body>
								</Accordion.Item>)
							))}
						</Accordion>
					</Form.Group>
					<Button variant="primary" type="submit">
						Submit
					</Button>
				</Form>
			</div>
		</div>

		{
			career &&
			<div>
				{career}
				{
					guides.map(item => <div>{item.value}</div>)
				}
			</div>
		}

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

export default CareerGuide
