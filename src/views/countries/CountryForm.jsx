import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CRow, CCol } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import Label from '../../components/labels/Label'

import validations from "./countryValidations";

export default function CountryForm(props) {
   const country = useSelector(store => store.country)

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
                     <Label title='Code' id='code' validations={validations} />
                     <InputT name='code' register={props.register} validation={validations} errors={props.errors} />
                  </CCol>
               </CFormGroup>
               <CFormGroup row>
                  <CCol>
                     <ButtonForm loading={country.loading} action={props.action} url='countries' iamModalClose={props?.iamModalClose} />
                  </CCol>
               </CFormGroup>
            </CForm>
         </CCol>
      </CRow>
   );
}