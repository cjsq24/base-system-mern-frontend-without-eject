import {
   CCard,
   CCardBody,
   CCardHeader
 } from '@coreui/react'

export default function CardSimple(props) {
   return (
      <CCard className="mb-4">
         <CCardHeader>
            <h4>{props.title}</h4>
         </CCardHeader>
         <CCardBody>
            {props.children}
         </CCardBody>
      </CCard>
   );
}