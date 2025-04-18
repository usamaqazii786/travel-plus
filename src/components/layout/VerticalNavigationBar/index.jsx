import { Suspense } from 'react'
import Preloader from '@/components/Preloader'
import LogoBox from '@/components/LogoBox'
// import IconifyIcon from '@/components/wrappers/IconifyIcon';
import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { getMenuItems, getMenuItemsAgentNew } from '@/helpers/menu'
import AppMenu from './components/AppMenu'
import { useMenuItemsAgent } from '../../../assets/data/menu-items'
const VerticalNavigationBar = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const IsnEwUser = user?.is_w9
  // console.log(user)
  const role = user?.role
  const menuItems = getMenuItems()
  const MenuItemNewAgent = getMenuItemsAgentNew()
  const MenuItemAgent = useMenuItemsAgent()
  const IsResidence = user?.location_status === 'Yes' ? 'W8' : 'W9'

  MenuItemAgent.map((item) => {
    if (item.key === 'w9' && item.children) {
      item.children = item.children.filter((child) => child.label !== IsResidence)
    }
    return item
  })
  MenuItemNewAgent.map((item) => {
    if (item.key === 'w9' && item.children) {
      item.children = item.children.filter((child) => child.label !== IsResidence)
    }
    return item
  })
  return (
    <div className="startbar d-print-none">
      <div className="brand">
        <LogoBox />
      </div>
      <div className="startbar-menu">
        <SimplebarReactClient className="startbar-collapse" id="startbarCollapse">
          <div className="d-flex align-items-start flex-column w-100">
            <Suspense fallback={<Preloader />}>
              {IsnEwUser == 'false' ? (
                <AppMenu menuItems={MenuItemNewAgent} />
              ) : role === 'admin' ? (
                <AppMenu menuItems={menuItems} />
              ) : (
                <AppMenu menuItems={MenuItemAgent} />
              )}
            </Suspense>

            {/* <div className="update-msg text-center">
              <div className="d-flex justify-content-center align-items-center thumb-lg update-icon-box  rounded-circle mx-auto">
                <IconifyIcon icon="iconoir:peace-hand" className="h3 align-self-center mb-0 text-primary" />
              </div>
              <h5 className="mt-3">Mannat Themes</h5>
              <p className="mb-3 text-muted">Travel+ is a high quality web applications.</p>
              <button className="btn text-primary shadow-sm rounded-pill">Upgrade your plan</button>
            </div> */}
          </div>
        </SimplebarReactClient>
      </div>
    </div>
  )
}
export default VerticalNavigationBar
