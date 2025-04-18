import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

import mailReducer from './slices/mail'
import chatReducer from './slices/chat'
import websiteReducer from './slices/website'
import calendarReducer from './slices/calendar'
import kanbanReducer from './slices/kanban'
import Weedowlproduct from './Weedowl/Weedowlproduct'
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  website: websiteReducer,
  weedproduct: Weedowlproduct,
})

export { rootPersistConfig, rootReducer }
