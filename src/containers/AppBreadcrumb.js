import React from 'react'
import { useLocation, Link } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'
//import { cibSkillshare } from '@coreui/icons'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute?.name
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      breadcrumbs.push({
        pathname: currentPathname,
        name: getRouteName(currentPathname, routes),
        active: index + 1 === array.length ? true : false,
      })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem>
        <Link to='/'>Home</Link>
      </CBreadcrumbItem>
      {
        breadcrumbs?.length > 0 && breadcrumbs[0].pathname !== '/dashboard' && breadcrumbs[0].pathname !== '/' &&
      
        breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem key={index} >
              {!breadcrumb.active ? (
                  <Link to={breadcrumb.pathname}>{breadcrumb.name}</Link>
                ) : (
                  breadcrumb.name
                )
              }
            </CBreadcrumbItem>
          )
        })
      }
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
