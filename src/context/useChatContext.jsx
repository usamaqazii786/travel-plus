/* eslint-disable react-refresh/only-export-components */
'use client'

import { createContext, useContext, useState, useEffect } from 'react'
// import { getUserById } from '@/helpers/data'
import Pusher from 'pusher-js'

import { getAllChatadmin, getAllChatsubadmin } from '../utils/Services/ChatServices'
const ChatContext = createContext(undefined)
export const useChatContext = () => {
  const context = useContext(ChatContext)
  if (!context) {
    throw new Error('useChatContext can only be used within ChatProvider')
  }
  return context
}
export const ChatProvider = ({ children }) => {
  const [activeChat, setActiveChat] = useState([])
  const [channelname, setChannelname] = useState('')
  const user = JSON.parse(localStorage.getItem('user'))
  const changeActiveChat = async (userId) => {
    if (user?.role == 'admin') {
      getAllChatadmin(userId, setActiveChat)
    } else {
      getAllChatsubadmin(userId, setActiveChat)
    }

    // if (user) setActiveChat(user)
  }
  useEffect(() => {
    const pusher = new Pusher('cedf0f6d3dab71e6787b', {
      cluster: 'ap2',
    })

    pusher.connection.bind('connected', () => {
      console.log('✅ Pusher connected successfully!')
    })

    pusher.connection.bind('error', (err) => {
      console.error('❌ Pusher connection error:', err)
    })

    let channel = null

    // channel = pusher.subscribe(`messages-channel-${user?.id}`)
    channel = pusher.subscribe(`messages-channel-${user?.id}`)

    channel.bind('messages.received', (data) => {
      setActiveChat((prev) => [...prev, data?.message])
    })
    return () => {
      if (channel) {
        channel.unbind_all()
        channel.unsubscribe()
      }
      pusher.disconnect()
    }
  }, [user])
  return (
    <ChatContext.Provider
      value={{
        activeChat,
        changeActiveChat,
        channelname,
        setChannelname,
      }}>
      {children}
    </ChatContext.Provider>
  )
}
