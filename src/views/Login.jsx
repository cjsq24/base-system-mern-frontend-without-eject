import { useHistory, Link } from 'react-router-dom';
import useAuth from "../auth/useAuth";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { CButton, CCard, CCardBody, CCardGroup, CCol, CContainer, CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import InputT from '../components/inputs/InputT'
import userActions from '../redux/user/user.action'

const validations = {
   email: {
      required: 'Ingresa tu correo electrónico',
      pattern: {
         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
         message: 'Ingrese un email válido'
      }
   },
   password: {
      required: 'Ingresa tu contraseña'
   }
}


export default function Login() {
   const dispatch = useDispatch()
   const user = useSelector(store => store.user)
   const auth = useAuth()
   const history = useHistory()
   const { register, handleSubmit, formState: { errors } } = useForm()

   const onSubmit = async (values) => {
      const res = await dispatch(userActions.login(values))
      if (res.success) {
         console.log(res.values)
         auth.login(res.values)
         history.push('/dashboard')
      }
   }

   return (
      <div className="c-app c-default-layout flex-row align-items-center">
         <CContainer>
            <CRow className="justify-content-center">
               <CCol md="8">
                  <CCardGroup>
                     <CCard className="p-4">
                        <CCardBody>
                           <CForm onSubmit={handleSubmit(onSubmit)}>
                              <h1>Login</h1>
                              <p className="text-muted">Sign In to your account</p>
                              <CInputGroup className="">
                                 <CInputGroupPrepend>
                                    <CInputGroupText>
                                       <CIcon name="cil-user" />
                                    </CInputGroupText>
                                 </CInputGroupPrepend>
                                 <InputT name='email' placeholder='Enter your email' register={register} validation={validations} />
                              </CInputGroup>
                              <span className='text-danger'>
                                 {errors?.email?.message}
                              </span>
                              <CInputGroup className="mt-3">
                                 <CInputGroupPrepend>
                                    <CInputGroupText>
                                       <CIcon name="cil-lock-locked" />
                                    </CInputGroupText>
                                 </CInputGroupPrepend>
                                 <InputT type='password' name='password' placeholder='Enter your password' register={register} validation={validations} />
                              </CInputGroup>
                              <span className='text-danger'>
                                 {errors?.password?.message}
                              </span>
                              <CRow className="mt-3">
                                 <CCol xs="6">
                                    <CButton type='submit' color="primary" className="px-4" disabled={user.loading}>Login</CButton>
                                 </CCol>
                                 <CCol xs="6" className="text-right">
                                    <CButton color="link" className="px-0">Forgot password?</CButton>
                                 </CCol>
                              </CRow>
                           </CForm>
                        </CCardBody>
                     </CCard>
                     <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                        <CCardBody className="text-center">
                           <div>
                              <h2>Sign up</h2>
                              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                                 labore et dolore magna aliqua.</p>
                              <Link to="/register">
                                 <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                              </Link>
                           </div>
                        </CCardBody>
                     </CCard>
                  </CCardGroup>
               </CCol>
            </CRow>
         </CContainer>
      </div>
   );
}