import React, { useEffect, useState } from 'react'
import ChatsItem, { ChatUserItem } from '../../../components/web/chats/chats-item/chat-item'
import SelectedChatItem from '../../../components/web/chats/selected-chat-item/selected-chat-item'
import { SessionHandler } from '../../../utils/session-handler'
import { ChatUser, useChatUserCreate } from '../../../hooks/web/chats/useChatUserCreate'
import { useGetAllChatUsers } from '../../../hooks/web/chats/useGetAllChatUsers'
import { useRetriveMessages } from '../../../hooks/web/chats/useRetriveMessages'
import "./chat.scss"

const sessionHandler = new SessionHandler()

const Chats = () => {

	const [users, setUsers] = useState<ChatUserItem[]>()
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
	const { latestMessage } = useRetriveMessages(sessionHandler.getSession("username"))

	useEffect(() => {
		setUsers(chatUsers)
	}, [chatUsers])

	useEffect(() => {
		if (latestMessage) {
			const updatedUsers = users?.map(item => {

				if (item.username === latestMessage.from) {
					return {
						username: item.username,
						name: item.name,
						newMessageCount: (item.newMessageCount ? item.newMessageCount + 1 : 1),
						latestMessageTime: latestMessage.timestamp,
						latestMessage: latestMessage.message
					}
				}

				return item
			})
			setUsers(updatedUsers)
		}
	}, [latestMessage])

	return (
		<>
			<div className="page chat-page">

				<div className="content">
					<div className="chat-container">
						{
							users && 
								users.map(item => 
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
				{latestMessage && latestMessage?.message}

			</div>
		</>
	)
}

export default Chats
