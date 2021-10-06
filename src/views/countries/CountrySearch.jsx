import { CModal, CModalHeader, CModalBody, CModalFooter, CForm, CFormGroup, CLabel } from '@coreui/react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import InputT from '../../components/inputs/InputT'
import Select from '../../components/selects/Select'
import ButtonsModalSearch from '../../components/buttons/ButtonsModalSearch'
import { setParamsSearch } from '../../helpers/generalFunctions';

import countryActions from '../../redux/country/country.action'

const colLabel = 'col-md-2 col-sm-12 col-xs-12'
const colInput = 'col-md-10 col-sm-12 col-xs-12'

export default function CountrySearch({ modal, closeSearch }) {
   const dispatch = useDispatch()
   const { register, handleSubmit, reset } = useForm();

   const onSubmit = async (values) => {
      const params = setParamsSearch(values)
      await dispatch(countryActions.list(params))
      closeSearch()
   }

   return (
      <CModal show={modal} onClose={closeSearch}>
         <CForm onSubmit={handleSubmit(onSubmit)} autoComplete={'off'}>
            <CModalHeader closeButton>Modal de Búsqueda</CModalHeader>
            <CModalBody>
               <CFormGroup row>
                  <div className={colLabel}>
                     <CLabel htmlFor="name">Name</CLabel>
                  </div>
                  <div className={colInput}>
                     <InputT name='name' register={register} />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <div className={colLabel}>
                     <CLabel htmlFor="code">Code</CLabel>
                  </div>
                  <div className={colInput}>
                     <InputT name='code' register={register} />
                  </div>
               </CFormGroup>
               <CFormGroup row>
                  <div className={colLabel}>
                     <CLabel htmlFor="status">Status</CLabel>
                  </div>
                  <div className={colInput}>
                     <Select
                        name='status'
                        simple
                        data={[['1', 'Activo'], ['0', 'Inactivo']]}
                        register={register}
                     />
                  </div>
               </CFormGroup>
            </CModalBody>
            <CModalFooter>
               <ButtonsModalSearch reset={reset} closeSearch={closeSearch} />
            </CModalFooter>
         </CForm>
      </CModal>
   )
}