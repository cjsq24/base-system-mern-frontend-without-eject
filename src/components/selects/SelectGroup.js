import { CButton } from '@coreui/react';
import ErrorMsgInput from '../ErrorMsgInput';
import { FaPlus } from 'react-icons/fa'

export default function SelectGroup(props) {
   const { name, register, validations, setLoading, loading, fields, data, errors, onClick, onChange, simple } = props
   return (
      <>
         <div className="input-group">
            <select
               className={`form-control ${(errors && errors[name]) ? 'is-invalid-custom' : ''}`}
               {...register(name, validations[name])}
               onChange={(e) => onChange ? onChange(e.target.value) : null}
            >
               {setLoading && loading ? (
                  <option value=''>Loading...</option>
               ) : (
                  <>
                     <option value=''>Seleccione</option>
                     {data?.length > 0 &&
                        simple
                        ? (
                           data.map((item, key) => (
                              <option key={key} value={item[0]}>{item[1]}</option>
                           ))
                        )
                        : (
                           Array.isArray(fields)
                              ? (
                                 data.map((item, key) => (
                                    <option key={key} value={item[fields[0]]}>{item[fields[1]]}</option>
                                 ))
                              )
                              : (
                                 data.map((item, key) => (
                                    <option key={key} value={item[fields.value]}>{item[fields.string]}</option>
                                 ))
                              )
                        )
                     }
                  </>
               )
               }
            </select>
            <CButton color='info' variant='outline' onClick={onClick ? onClick : null}>
               <FaPlus />
            </CButton>
         </div>
         {errors &&
            <ErrorMsgInput>
               {errors && errors[name] && errors[name].message &&
                  errors[name].message
               }
            </ErrorMsgInput>
         }
      </>
   );
}