import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'

// sidebar nav config
import navigation from './_nav'
import useAuth from 'src/auth/useAuth'

//const menu = navigation()

const TheSidebar = () => {
  const dispatch = useDispatch()
  const sidebar = useSelector(state => state.sidebar)
  const [menu, setMenu] = useState([])

  const auth = useAuth()

  useEffect(() => {
    const getMenu = async () => {
      setMenu(await navigation(auth.modules))
    }
    getMenu()
  }, [auth])

  return (
    <CSidebar
      show={sidebar.show}
      onShowChange={(val) => dispatch({type: 'SET_SIDEBAR', show: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          className="c-sidebar-brand-full"
          name="logo-negative"
          height={35}
        />
        <CIcon
          className="c-sidebar-brand-minimized"
          name="sygnet"
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>

        <CCreateElement
          items={menu}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default React.memo(TheSidebar)
