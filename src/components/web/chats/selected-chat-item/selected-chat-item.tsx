import { Card } from "react-bootstrap"
import Avatar from 'react-avatar'
import "./selected-chat-item.scss"
import { ChatUser } from "../../../../hooks/web/chats/useChatUserCreate"


type Props = {
	chatSelected: ChatUser
}

function SelectedChatItem({ 
    chatSelected
}: Props) {
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
            <div>Content</div>
        </Card>
    )
}

export default SelectedChatItem