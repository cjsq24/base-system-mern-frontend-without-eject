import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CRow, CCol } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import Label from '../../components/labels/Label'

import validations from "./menuValidations";

export default function MenuForm(props) {
   const menu = useSelector(store => store.menu)

   return (
      <CRow className='justify-content-center'>
         <CCol md='6' sm='12' xs='12'>
            <CForm onSubmit={props.handleSubmit(props.onSubmit)} autoComplete={'off'}>
               <CFormGroup row>
                  <CCol>
                     <Label title='Name' id='name' validations={validations} />
                     <InputT name='name' register={props.register} validation={validations} errors={props.errors} />
                  </CCol>
               </CFormGroup>
               <CFormGroup row>
                  <CCol>
                     <Label title='Url' id='url' validations={validations} />
                     <InputT name='url' register={props.register} validation={validations} errors={props.errors} />
                  </CCol>
               </CFormGroup>
               <CFormGroup row>
                  <CCol>
                     <ButtonForm loading={menu.loading} action={props.action} url='menus' />
                  </CCol>
               </CFormGroup>
            </CForm>
         </CCol>
      </CRow >
   );
}