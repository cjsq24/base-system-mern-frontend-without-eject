import { useState } from 'react'
import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CRow, CCol, CModal } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import SelectGroup from '../../components/selects/SelectGroup'
import Label from '../../components/labels/Label'
import CountryCreate from '../countries/CountryCreate'

import validations from './stateValidations';

export default function StateForm(props) {
   const state = useSelector(store => store.state)
   const country = useSelector(store => store.country)

   const [modalCreate, setModalCreate] = useState(false);
   const closeModalCreate = (country_id = null) => {
      if (country_id) {
         props.setValue('country_id', country_id)
      }
      setModalCreate(false)
   }

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
                     <Label title='Country' id='country_id' validations={validations} />
                     <SelectGroup
                        name='country_id'
                        data={country.listAll}
                        setLoading={true}
                        loading={country.listAllLoading}
                        fields={['_id', 'name']}
                        register={props.register}
                        validations={validations}
                        errors={props.errors}
                        onClick={() => setModalCreate(true)}
                     />
                  </CCol>
               </CFormGroup>
               <CFormGroup row>
                  <CCol>
                     <ButtonForm loading={state.loading} action={props.action} url='states' iamModalClose={props?.iamModalClose} />
                  </CCol>
               </CFormGroup>
            </CForm>
            <CModal show={modalCreate} onClose={() => setModalCreate(false)} size='lg'>
               <CountryCreate iamModal iamModalClose={closeModalCreate} />
            </CModal>
         </CCol>
      </CRow>
   );
}