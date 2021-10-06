import React from 'react'
import { CContainer, CFade } from '@coreui/react'

const TheContent = (props) => {
  return (
    <main className="c-main">
      <CContainer fluid>
          <CFade>
            {props.children}
          </CFade>
      </CContainer>
    </main>
  )
}

export default React.memo(TheContent)
