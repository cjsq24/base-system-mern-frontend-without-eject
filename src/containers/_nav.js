import React from 'react'
import CIcon from '@coreui/icons-react'

const navigation = async (modules) => {
  let _nav =  [
    {
      _tag: 'CSidebarNavItem',
      name: 'Dashboard',
      to: '/dashboard',
      icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Countries',
      to: '/countries',
      icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'States',
      to: '/states',
      icon: <CIcon name="cil-calculator" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Cities',
      to: '/cities',
      icon: <CIcon name="cil-star" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Users',
      to: '/users',
      icon: <CIcon name="cil-pencil" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Menus',
      to: '/menus',
      icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon"/>
    }, {
      _tag: 'CSidebarNavItem',
      name: 'Roles',
      to: '/roles',
      icon: <CIcon name="cil-bell" customClasses="c-sidebar-nav-icon"/>
    },
  ]

  _nav = _nav.filter((nav) => {
    if (modules.includes(nav.to.replace('/', ''))) {
      return nav
    }
    return false
  })

  return _nav
}
export default navigation