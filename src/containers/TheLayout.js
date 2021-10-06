import React, { Suspense } from 'react'
import {
  TheContent,
  TheSidebar,
  TheFooter,
  TheHeader
} from './index'
import useAuth from '../auth/useAuth';

const loading = (
  <div className="pt-3 text-center">
    <p>Cargando...</p>
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

const TheLayout = (props) => {
  const auth = useAuth()

  return (
    <div className="c-app c-default-layout">
      <TheSidebar/>
      <div className="c-wrapper">
        <TheHeader/>
        <div className="c-body">
          {auth.modules.includes(props.path.split('/')[0]) &&
            <Suspense fallback={loading}>
              <TheContent {...props} />
            </Suspense>
          }
        </div>
        <TheFooter/>
      </div>
    </div>
  )
}

export default TheLayout
