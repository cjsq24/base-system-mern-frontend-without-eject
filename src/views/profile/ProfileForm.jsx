import { useState } from 'react'
import { useSelector } from 'react-redux';
import { CForm, CFormGroup, CCol, CModal, CRow } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import SelectGroup from '../../components/selects/SelectGroup'
import Label from '../../components/labels/Label'
import RoleCreate from '../roles/Create'

import validations from "./validations";

const col = 'col-md-6 col-sm-6 col-xs-12'

export default function UserForm(props) {
   const user = useSelector(store => store.user)
   const role = useSelector(store => store.role)

   const [modalCreate, setModalCreate] = useState(false);
   const closeModalCreate = (role_id = null) => {
      if (role_id) {
         console.log(role_id)
         props.setValue('role_id', role_id)
      }
      setModalCreate(false)
   }

   return (
      <CRow className='justify-content-center'>
         <CCol md='8' sm='12' xs='12'>
            <CForm onSubmit={props.handleSubmit(props.onSubmit)} autoComplete={'off'}>
               <CFormGroup row>
                  <div className={col}>
                     <Label title='Name' id='name' validations={validations} />
                     <InputT name='name' register={props.register} validation={validations} errors={props.errors} />
                  </div>
                  <div className={col}>
                     <Label title='Last Name' id='last_name' validations={validations} />
                     <InputT name='last_name' register={props.register} validation={validations} errors={props.errors} />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <div className={col}>
                     <Label title='Email' id='email' validations={validations} />
                     <InputT name='email' register={props.register} validation={validations} errors={props.errors} />
                  </div>
                  <div className={col}>
                     <Label title='Role' id='role_id' validations={validations} />
                     <SelectGroup
                        name='role_id'
                        data={role.listAll}
                        setLoading={true}
                        loading={role.listAllLoading}
                        fields={{ value: 'id', string: 'name' }}
                        register={props.register}
                        validations={validations}
                        errors={props.errors}
                        onClick={() => setModalCreate(true)}
                     />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <CCol md='12' sm='12' xs='12'>
                     <ButtonForm loading={user.loading} action={props.action} url='users' />
                  </CCol>
               </CFormGroup>
            </CForm>
         </CCol>
         <CModal show={modalCreate} onClose={() => setModalCreate(false)} size='lg'>
            <RoleCreate iamModal iamModalClose={closeModalCreate} />
         </CModal>
      </CRow>
   );
}