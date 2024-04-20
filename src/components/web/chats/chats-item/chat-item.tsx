import { Card } from 'react-bootstrap'
import Avatar from 'react-avatar'
import { timeAgo } from '../../../../utils/dateTImeHandler'

import "./chat-item.scss"
import { ChatUser } from '../../../../hooks/web/chats/useChatUserCreate'

type Props = {
	item: ChatUser
	setSelectedChat?: (item: ChatUser) => void
}

function ChatsItem({ 
    item, 
    setSelectedChat 
}: Props) {

	return (
		<Card
			className="chat-item"
			onClick={() => (setSelectedChat ? setSelectedChat(item) : undefined)}
		>
			<div className="chat-logo">
				<Avatar
					name={item.name}
					className="rounded-circle avatar"
					size="40"
				/>
			</div>
			<div className="data">
                <div>
                    <div className="name">{item.name}</div>
                    {/* <div className="company-name">{"text company"}</div> */}
                    <div className="last-message">{"lkfd djf j djfdjf ipdjfodf dfd fd f df dfd jodj o"}</div>
                </div>
				<div className='side-content'>
                    <div className="times-ago">{timeAgo(new Date().toDateString())}</div>
                    <div className='counter-wrapper'>
                        <div className="count">1</div>
                    </div>
                </div>
			</div>
		</Card>
	)
}

export default ChatsItem