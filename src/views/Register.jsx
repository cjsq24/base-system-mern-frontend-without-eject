import { Link, useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { CButton, CCard, CCardBody, CCardFooter, CCol, CContainer, CForm, CInputGroup, CInputGroupPrepend, CInputGroupText, CRow } from '@coreui/react'
import CIcon from '@coreui/icons-react'

import InputT from '../components/inputs/InputT'
import userActions from '../redux/user/user.action'

export default function Register() {
   const dispatch = useDispatch()
   const history = useHistory()
   const user = useSelector(store => store.user)
   const { register, handleSubmit, getValues, formState: {errors} } = useForm()
   
   const validations = {
      name: { required: 'Ingresa tu nombre' },
      last_name: { required: 'Ingresa tu apellido' },
      email: {
         required: 'Ingresa tu correo electrónico',
         pattern: { 
            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
            message: 'Ingrese un email válido'
         }
      },
      password: { required: 'Ingresa tu contraseña' },
      password_confirm: {
         required: 'Confirma la contraseña',
         validate: {
            matchesPreviousPassword: (value) => {
               const { password } = getValues();
               return password === value || 'Passwords should match!';
            }
         }
      }
   }

   const onSubmit = async (values) => {
      const res = await dispatch(userActions.register(values))
      if (res.success) {
         history.push('/login')
      }
   }

   return (
      <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm onSubmit={handleSubmit(onSubmit)}>
                  <h1>Register</h1>
                  <p className="text-muted">Create your account</p>
                  <CInputGroup className="">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <InputT name='name' placeholder='Enter your name' register={register} validation={validations} />
                  </CInputGroup>
                  <span className='text-danger'>
                     {errors?.name?.message}
                  </span>

                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-user" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <InputT name='last_name' placeholder='Enter your last name' register={register} validation={validations} />
                  </CInputGroup>
                  <span className='text-danger'>
                     {errors?.last_name?.message}
                  </span>

                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
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
                    <InputT name='password' placeholder='Enter your password' register={register} validation={validations} />
                  </CInputGroup>
                  <span className='text-danger'>
                     {errors?.password?.message}
                  </span>
                  
                  <CInputGroup className="mt-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <InputT name='password_confirm' placeholder='Enter your password confirm' register={register} validation={validations} />
                  </CInputGroup>
                  <span className='text-danger'>
                     {errors?.password_confirm?.message}
                  </span>
                  <CButton type='submit' color="success" block className="mt-4" disabled={user.loading}>Create Account</CButton>
                  <Link to='login'><CButton color="primary" block className="mt-2">Iniciar Sesión</CButton></Link>
                </CForm>
              </CCardBody>
              <CCardFooter className="p-4">
                <CRow>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-facebook mb-1" block><span>facebook</span></CButton>
                  </CCol>
                  <CCol xs="12" sm="6">
                    <CButton className="btn-twitter mb-1" block><span>twitter</span></CButton>
                  </CCol>
                </CRow>
              </CCardFooter>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
   );
}