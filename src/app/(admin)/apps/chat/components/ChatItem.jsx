// import clsx from 'clsx'
// import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { timeSince } from '@/utils/date'
import { useChatContext } from '@/context/useChatContext'
import { addOrSubtractMinutesFromDate } from '../../../../../utils/date'
const ChatItem = ({ id, image, name, unreadCount }) => {
  const { changeActiveChat } = useChatContext()
  const lastActivity = addOrSubtractMinutesFromDate(1)
  return (
    <div onClick={() => changeActiveChat(id)} className="p-2 border-dashed border-theme-color rounded mb-2">
      <div role="button">
        <div className="d-flex align-items-start">
          <div className="position-relative">
            <img
              src={
                image ||
                'https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8='
              }
              alt="avatar"
              className="thumb-lg  rounded"
            />
            {/* <span className="position-absolute bottom-0 end-0">
              <IconifyIcon
                icon="fa6-solid:circle"
                className={clsx('fs-10 border-2 border-theme-color', activityStatus !== 'offline' ? 'text-success' : 'text-secondary')}
              />
            </span> */}
          </div>
          <div className="flex-grow-1 ms-2 text-truncate align-self-center">
            <h6 className="my-0 fw-medium text-dark fs-14">
              {name}
              <small className="float-end text-muted fs-11">{timeSince(new Date(lastActivity))}</small>
            </h6>
            <p className="text-muted mb-0">
              {/* <span className="text-primary">{lastMessage}</span> */}
              {/* {activityStatus === 'typing' ? <span className="text-primary">Typing...</span> : lastMessage} */}
              {unreadCount && <span className="badge float-end rounded text-white bg-success ">{unreadCount}</span>}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ChatItem
