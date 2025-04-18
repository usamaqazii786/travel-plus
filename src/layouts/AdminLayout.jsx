import { lazy, Suspense } from 'react';
import Preloader from '@/components/FallbackLoading';
import Footer from '@/components/layout/Footer';

const VerticalNavigationBar = lazy(() => import('@/components/layout/VerticalNavigationBar'));
const TopNavigationBar = lazy(() => import('@/components/layout/TopNavigationBar'));
const AdminLayout = ({
  children
}) => {
  return <>
      <Suspense>
        <TopNavigationBar />
      </Suspense>

      <Suspense fallback={<Preloader />}>
        <VerticalNavigationBar />
      </Suspense>

      <div className="page-wrapper">
        <div className="page-content">
          <div className="container-xxl">
            <Suspense fallback={<Preloader />}>{children}</Suspense>
          </div>
          <Footer />
        </div>
      </div>
    </>;
};
export default AdminLayout;