import { useEffect, useState } from 'react'
import { Nav, NavItem, NavLink, TabContainer, TabContent } from 'react-bootstrap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
// import ActiveUsersPane from './ActiveUsersPane'
import MessagesPane from './MessagesPane'
import { getAllChatadminList } from '../../../../../utils/Services/ChatServices'
// import { users } from '@/assets/data/other'
const ChatListPanel = () => {
  const [chats, setChats] = useState([
    {
      subadmin: {
        id: 1,
        fname: 'Admin',
        lname: 'Smith',
        email: 'john.doe@example.com',
        lastMessage: 'Hello, how are you?',
        lastMessageTime: '10:30 AM',
        unreadMessages: 5,
        online: true,
        image: '/public/assets/avatar.webp',
      },
    },
  ])
  const [, setloading] = useState(true)
  const user = JSON.parse(localStorage.getItem('user') || [])
  useEffect(() => {
    if (user?.role == 'admin') {
      getAllChatadminList(setChats, setloading)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const search = (text) => {
    setChats(chats?.filter((u) => u.fname?.toLowerCase().indexOf(text?.toLowerCase()) >= 0))
  }
  const handlecros = () => {
    getAllChatadminList(setChats, setloading)
  }
  return (
    <div className="chat-box-left">
      <TabContainer mountOnEnter defaultActiveKey="Messages">
        <Nav justify variant="tabs">
          <NavItem role="presentation">
            <NavLink as="span" className="py-2 text-dark" eventKey="Messages" role="button">
              Messages
            </NavLink>
          </NavItem>
          {/* <NavItem role="presentation">
            <NavLink as="span" className="py-2 text-dark" eventKey="Active" role="button">
              Active
            </NavLink>
          </NavItem> */}
        </Nav>
        <div className="chat-search p-3">
          <div className="p-1 bg-light rounded rounded-pill">
            <div className="input-group">
              <div className="input-group-prepend" onClick={() => handlecros()}>
                <button type="button" className="btn btn-link text-secondary">
                  <IconifyIcon icon="fa6-solid:magnifying-glass" />
                </button>
              </div>
              <input
                type="search"
                placeholder="Searching.."
                onChange={(e) => search(e.target.value)}
                aria-describedby="button-addon2"
                className="form-control border-0 bg-light"
              />
            </div>
          </div>
        </div>
        <SimplebarReactClient className="chat-body-left px-3">
          <TabContent>
            <MessagesPane chats={chats} />

            {/* <ActiveUsersPane chats={chats} /> */}
          </TabContent>
        </SimplebarReactClient>
      </TabContainer>
    </div>
  )
}
export default ChatListPanel
