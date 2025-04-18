import React from 'react'
import { Icon } from '@iconify/react'

import { NavItem, NavLink } from 'react-bootstrap'

export default function Tabs({ eventKey, icon, label,index }) {
  return (
    <>
      <NavItem>
        <NavLink eventKey={eventKey} tabIndex={index} className="fw-medium text-dark"  role="tab" aria-selected="true">
          <Icon icon={icon} width={20} className="me-2" />
          {label}
        </NavLink>
      </NavItem>
    </>
  )
}
