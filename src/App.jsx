import AppProvidersWrapper from './components/wrappers/AppProvidersWrapper'
import AppRouter from './routes/router'
import { Provider as ReduxProvider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/lib/integration/react'
// import configureFakeBackend from './helpers/fake-backend';
import '@/assets/scss/app.scss'
import '@/assets/scss/icons.scss'
function App() {
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppProvidersWrapper>
          <AppRouter />
        </AppProvidersWrapper>
      </PersistGate>
    </ReduxProvider>
  )
}
export default App
