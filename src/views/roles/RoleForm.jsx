import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CForm, CFormGroup, CCol, CRow, CButton } from '@coreui/react';
import InputT from '../../components/inputs/InputT'
import ButtonForm from '../../components/buttons/ButtonForm'
import Label from '../../components/labels/Label'

import menuActions from '../../redux/menu/menu.action'
import validations from "./roleValidations";

const col = 'col-md-6 col-sm-6 col-xs-12'

export default function RoleForm(props) {
   const dispatch = useDispatch()
   const role = useSelector(store => store.role)
   const menu = useSelector(store => store.menu)
   const [selectedMenus, setSelectedMenus] = useState(props.data?.modules ? JSON.parse(props.data.modules) : [])
   
   useEffect(() => {
      dispatch(menuActions.listSelect({status: '1'}))
   }, [dispatch]);

   useEffect(() => {
      props.register('modules', {
         validate: () => Array.isArray(selectedMenus) && selectedMenus.length > 0
      })
   }, [props, selectedMenus])

   const selectMenu = (url) => {
      console.log(selectedMenus)
      const modules = selectedMenus
      modules.push(url)
      setSelectedMenus([...modules])
   }

   const unSelectMenu = (url) => {
      const modules = selectedMenus
      for (let i = 0; i < modules.length; i++) {
         if (modules[i] === url) {
            modules.splice(i, 1);
         }
      }
      setSelectedMenus([...modules])
   }

   const checkMenu = (url) => {
      return selectedMenus.includes(url)
   }

   return (
      <CRow className='justify-content-center'>
         <CCol>
            <CForm onSubmit={props.handleSubmit((values) => props.onSubmit(values, selectedMenus))} autoComplete={'off'}>
               <CRow className='justify-content-center'>
                  <CCol md='8' sm='12' xs='12'>
                     <CFormGroup row>
                        <div className={col}>
                           <Label title='Name' id='name' validations={validations} />
                           <InputT name='name' register={props.register} validation={validations} errors={props.errors} />
                        </div>
                        <div className={col}>
                           <Label title='Key Name' id='key_name' validations={validations} />
                           <InputT name='key_name' register={props.register} validation={validations} errors={props.errors} />
                        </div>
                     </CFormGroup>
                  </CCol>
               </CRow>
               <CFormGroup row>
                  <CCol>
                     <CRow className='justify-content-center'>
                        <CCol className='d-flex row justify-content-center col-md-6 align-items-center'>
                           <table className="table table-striped table-sm">
                              <thead>
                                 <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Menu</th>
                                    <th scope="col">Url</th>
                                    <th scope="col"></th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {!menu.listSelectLoading ? (
                                    menu.listSelect.map(({ name, url }, key) => (
                                       <tr key={key}>
                                          <td>{key + 1}</td>
                                          <td>{name}</td>
                                          <td>{`/${url}`}</td>
                                          <td>
                                             <CButton
                                                color={'info'}
                                                variant={`${checkMenu(url) ? '' : 'outline'}`}
                                                onClick={() => checkMenu(url) ? unSelectMenu(url) : selectMenu(url)}
                                                style={{width:40, justifyContent:'center', alignItems:'center', padding:0}}
                                             >
                                                {`${checkMenu(url) ? 'Yes' : 'No'}`}
                                             </CButton>
                                          </td>
                                       </tr>
                                    ))
                                 ) : (
                                    <tr>
                                       <td colSpan='4'>Loading Menus...</td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </CCol>
                     </CRow>
                     <CRow className={'justify-content-center col-md-8'}>
                        <span>{props.errors?.modules && <span className='text-danger'>Select Menus</span>}</span>
                     </CRow>
                  </CCol>
               </CFormGroup>
               <CFormGroup row className='justify-content-center'>
                  <CCol md='8' sm='12' xs='12'>
                     <ButtonForm loading={role.loading} action={props.action} url='roles' iamModalClose={props?.iamModalClose} />
                  </CCol>
               </CFormGroup>
            </CForm>
         </CCol>
      </CRow>
   );
}