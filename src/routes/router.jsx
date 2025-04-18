import { Navigate, Route, Routes } from 'react-router-dom'
// import OtherLayout from '@/layouts/OtherLayout'
import { useAuthContext } from '@/context/useAuthContext'
import { appRoutes, authRoutes } from '@/routes/index'
// import AdminLayout from '@/layouts/AdminLayout'
import { Suspense, lazy } from 'react'
import Splash from '../components/Loader/Splash'
// import { PaymentForm } from '../app/Agent/dashboard/PaymentNotification/AddPaymentForEmail'
const OtherLayout = lazy(() => import('@/layouts/OtherLayout'))
const AdminLayout = lazy(() => import('@/layouts/AdminLayout'))
const PaymentForm = lazy(() => import('../app/Agent/dashboard/PaymentNotification/AddPaymentForEmail'))
const AppRouter = (props) => {
  const { isAuthenticated } = useAuthContext()
  return (
    <Suspense fallback={<Splash />}>
      <Routes>
        {(authRoutes || []).map((route, idx) => (
          <Route key={idx + route.name} path={route.path} element={<OtherLayout {...props}>{route.element}</OtherLayout>} />
        ))}
        <Route key={1} path={'/client-payment'} element={<PaymentForm />} />

        {(appRoutes || []).map((route, idx) => (
          <Route
            key={idx + route.name}
            path={route.path}
            element={
              isAuthenticated ? (
                <AdminLayout {...props}>{route.element}</AdminLayout>
              ) : (
                <Navigate
                  to={{
                    pathname: '/agent/login',
                    search: 'redirectTo=' + route.path,
                  }}
                />
              )
            }
          />
        ))}
      </Routes>
    </Suspense>
  )
}

export default AppRouter
