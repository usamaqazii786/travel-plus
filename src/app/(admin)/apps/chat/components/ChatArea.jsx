import { yupResolver } from '@hookform/resolvers/yup'
import clsx from 'clsx'
import { useCallback, useEffect, useRef, useState } from 'react'
// import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
// import { messages } from '@/assets/data/apps'
import TextFormInput from '@/components/form/TextFormInput'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { useChatContext } from '@/context/useChatContext'
import {
  addOrSubtractMinutesFromDate,
  // timeSince
} from '@/utils/date'
import avatar1 from '/public/assets/avatar.webp'
// import avatar10 from '@/assets/images/users/avatar-10.jpg'
import { HandleChatPost, HandleChatPostSubadmin } from '../../../../../utils/Services/ChatServices'

const AlwaysScrollToBottom = () => {
  const elementRef = useRef(null)
  useEffect(() => {
    if (elementRef?.current?.scrollIntoView)
      elementRef.current.scrollIntoView({
        behavior: 'smooth',
      })
  })
  return <div ref={elementRef} />
}
const UserMessage = ({ message, toUser }) => {
  const received = message.from == toUser?.id
  // console.log(received)
  return (
    <div
      className={clsx('d-flex', {
        'flex-row-reverse': received,
      })}>
      {/* <img src={received ? message.admin?.image : message.subadmin?.image || avatar1} alt="user-avatar" className="rounded thumb-md" /> */}
      <div className={clsx('chat-box w-100', received ? 'me-1 reverse' : 'ms-1')}>
        {message?.attachment && <img src={message?.attachment} style={{ width: 'auto' }} alt="image" />}
        {message?.message && (
          <div className="user-chat">
            <p className="text-custom">{message.message}</p>
          </div>
        )}

        {/* <div className="chat-time">{message?.time}</div> */}
      </div>
    </div>
  )
}
const ChatArea = () => {
  const { activeChat ,setChannelname,changeActiveChat} = useChatContext()

  const user = JSON.parse(localStorage.getItem('user'))
  const [userMessages, setUserMessages] = useState([])
  const messageSchema = yup.object({
    newMessage: yup.string(),
  })
  const { reset, handleSubmit, control } = useForm({
    resolver: yupResolver(messageSchema),
  })

  const getMessagesForUser = useCallback(() => {
    if (activeChat) {
      // console.log(messages,'messages')
      setUserMessages(activeChat)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat, user.id])
  useEffect(() => {
    getMessagesForUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeChat])
  const data = activeChat?.find((e) => e?.from == user?.id)
  const [selectedImage, setSelectedImage] = useState(null)
  const [image, setImage] = useState(null)
  const sendChatMessage = (values) => {
    if (activeChat) {
      const newUserMessages = [...userMessages]
      newUserMessages.push({
        id: (userMessages.length + 1).toString(),
        from: user?.id,
        to: activeChat,
        message: values.newMessage ?? '',
        attachment: selectedImage,
        sentOn: addOrSubtractMinutesFromDate(0.1),
      })
      if (user?.role == 'admin') {
        const id = activeChat.find((e)=>e.subadmin_id)
        // console.log(id)
        HandleChatPost(id?.subadmin?.id, values?.newMessage, image,setChannelname,changeActiveChat)
      } else {
        HandleChatPostSubadmin(data?.subadmin?.id, values?.newMessage, image,setChannelname,changeActiveChat)
      }
      // const checkadmin  = user?.id ===data?.id
      // setTimeout(() => {
      //   const otherNewMessages = [...newUserMessages]
      //   otherNewMessages.push({
      //     id: (userMessages.length + 1).toString(),
      //     from: activeChat,
      //     to: user?.id,
      //     message: values.newMessage ?? '',
      //     sentOn: addOrSubtractMinutesFromDate(0.1),
      //   })
      //   setUserMessages(otherNewMessages)
      // }, 1000)
      setUserMessages(newUserMessages)
      reset()
      setSelectedImage(null)
      setImage(null)
    }
  }
  const handleImageChange = (event) => {
    const file = event.target.files[0]
    setImage(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setSelectedImage(imageUrl)
    }
  }

  if (activeChat) {
    // const { lastActivity } = activeChat
    // console.log(data)

    return (
      <div className="chat-box-right">
        <div className="p-3 d-flex justify-content-between align-items-center card-bg rounded">
          <div role="button" className="d-flex align-self-center">
            <div className="flex-shrink-0">
              <img src={user?.role == 'admin' ? data?.subadmin?.image : avatar1} alt="user" className="rounded thumb-lg" />
            </div>
            <div className="flex-grow-1 ms-2 align-self-center">
              <div>
                <h6 className="my-0 fw-medium text-dark fs-14">{user?.role == 'admin' ? data?.subadmin?.fname : 'Admin'}</h6>
                {/* <p className="text-muted mb-0">Last seen: {timeSince(new Date(lastActivity))}</p> */}
              </div>
            </div>
          </div>
          {/* <div className="d-none d-sm-inline-block align-self-center mb-1">
            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-primary">Call</Tooltip>}>
              <span role="button" className="fs-22 me-2 text-muted">
                <IconifyIcon icon="iconoir:phone" />
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-primary">Video call</Tooltip>}>
              <span role="button" className="fs-22 me-2 text-muted">
                <IconifyIcon icon="iconoir:video-camera" />
              </span>
            </OverlayTrigger>
            <OverlayTrigger placement="top" overlay={<Tooltip className="tooltip-primary">Delete</Tooltip>}>
              <span role="button" className="fs-22 me-2 text-muted">
                <IconifyIcon icon="iconoir:trash" />
              </span>
            </OverlayTrigger>
            <span role="button" className="fs-22 text-muted">
              <IconifyIcon icon="iconoir:menu-scale" />
            </span>
          </div> */}
        </div>
        <SimplebarReactClient className="chat-body">
          <div className="chat-detail">
            {userMessages.map((message) => {
              return <UserMessage key={message.id} message={message} toUser={user} />
            })}

            <AlwaysScrollToBottom />
          </div>
        </SimplebarReactClient>
        <div className="chat-footer">
          <form className="d-flex" onSubmit={handleSubmit(sendChatMessage)}>
            {selectedImage && (
              <div className="preview-container" style={{ width: '100px' }}>
                <img src={selectedImage} alt="Preview" className="preview-image" style={{ width: '100px' }} />
                <button
                  type="button"
                  className="btn-close"
                  style={{ position: 'relative', bottom: '100px', width: '168px' }}
                  onClick={() => setSelectedImage(null)}>
                  {/* ✕ */}
                </button>
              </div>
            )}
            <TextFormInput containerClassName="w-100" name="newMessage" control={control} placeholder="Type something here..." noValidate />
            <div className="text-start">
              <div className="chat-features icons-center flex-nowrap">
                <div className="d-none d-sm-inline-flex ">
                  <span role="button" className="position-relative">
                    <IconifyIcon icon="iconoir:camera" />
                    <input type="file" accept="image/*" onChange={handleImageChange} className="file-input" />
                  </span>
                  {/* <span role="button"></span>

                  <span role="button">
                    <IconifyIcon icon="iconoir:microphone" />
                  </span> */}
                </div>
                <button type="submit" role="button" className="btn p-0 text-primary">
                  <IconifyIcon icon="iconoir:send-solid" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}
export default ChatArea
