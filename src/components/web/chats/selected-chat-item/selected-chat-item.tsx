import { Button, Card, Form } from "react-bootstrap"
import Avatar from 'react-avatar'
import * as yup from 'yup'
import { ChatUser } from "../../../../hooks/web/chats/useChatUserCreate"
import { yupResolver } from "@hookform/resolvers/yup"
import "./selected-chat-item.scss"
import { Controller, useForm } from "react-hook-form"
import { useMessageCreate } from "../../../../hooks/web/chats/useMessageCreate"

const schema = yup.object().shape({
	message: yup.string().required('message is required'),
})

export interface IMessage {
	message: string;
}

type Props = {
	chatSelected: ChatUser,
	currentUser: string
}

const SelectedChatItem = ({ 
    chatSelected,
	currentUser
}: Props) => {

	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	})

	const { setMessage } = useMessageCreate()

	const onSubmit = (data: IMessage) => {
		console.log(data)
		if (data?.message) {
			setMessage({
				from: currentUser,
				to: chatSelected.username,
				message: data.message
			})
		}
	}


    return (
		<Card className="selected-chat">
           <div className="selected-top-row">
				<div className="user-pic">
					<Avatar
						name={chatSelected.name}
						className="rounded-circle avatar"
						size="60"
					/>
					<div className="title-section">
						<div className="title">{chatSelected.name}</div>
						{/* <div className="company-name">{jobDetails.companyName}</div> */}
					</div>
				</div>
			</div>
            <div className="chat-contenct">
				content
			</div>
			<div>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Form.Group controlId="message">
						<Controller
							name="message"
							control={control}
							defaultValue=""
							render={({ field }) => (
								<Form.Control
									{...field}
									type="text"
									placeholder="Type a Message..."
								/>
							)}
						/>
						<Form.Text className="text-danger">
							{errors.message?.message}
						</Form.Text>
					</Form.Group>
					<Button variant="primary" type="submit">
								Send
					</Button>
				</Form>
			</div>
        </Card>
    )
}

export default SelectedChatItem