import ErrorMsgInput from '../ErrorMsgInput';

export default function InputT({type, name, placeholder, register, validation, errors, disabled}) {
   return (
      <>
         <input 
            type={type ? type : "text" }
            id={name} 
            className={`form-control ${(errors && errors[name]) ? 'is-invalid-custom' : ''}`} 
            placeholder={placeholder}
            disabled={disabled}
            {...register(name, validation ? validation[name] : undefined)}
         />
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