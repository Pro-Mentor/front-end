import React, { useState } from 'react'
import ChatsItem from '../../../components/web/chats/chats-item/chat-item'
import SelectedChatItem from '../../../components/web/chats/selected-chat-item/selected-chat-item'
import { SessionHandler } from '../../../utils/session-handler'
import { ChatUser, useChatUserCreate } from '../../../hooks/web/chats/useChatUserCreate'
import { useGetAllChatUsers } from '../../../hooks/web/chats/useGetAllChatUsers'
import "./chat.scss"

const sessionHandler = new SessionHandler()

const Chats = () => {

	const [selectedChat, setSelectedChat] = useState<ChatUser>()

	const { } = useChatUserCreate({
		username: sessionHandler.getSession("username"),
		name: sessionHandler.getSession("name")
	})

	const setSelectedChatHandler = (item: ChatUser) => {
		console.log(item);
		setSelectedChat(item)
	}

	const { chatUsers } = useGetAllChatUsers(sessionHandler.getSession("username"))

	return (
		<>
			<div className="page chat-page">

				<div className="content">
					<div className="chat-container">
						{
							chatUsers && 
								chatUsers.map(item => 
									<ChatsItem 
										key={item.username} 
										item={item} 
										setSelectedChat={setSelectedChatHandler}
									/>)
						}
					</div>
					{
						selectedChat && 
							<SelectedChatItem chatSelected={selectedChat} currentUser={sessionHandler.getSession("username")}/>
					}

				</div>

			</div>
		</>
	)
}

export default Chats
