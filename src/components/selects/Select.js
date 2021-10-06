export default function Select({name, register, validations, setLoading, loading, fields, data, errors, onChange, simple}) {
   return (
      <select className='form-control' {...register(name, validations ? validations[name] : undefined)} onChange={(e) => onChange ? onChange(e.target.value) : null}>
         {setLoading && loading ? (
               <option value=''>Loading...</option>
            )  :  (
               <>
                  <option value=''>Seleccione</option>
                  {data?.length > 0 &&
                     simple 
                        ? (
                           data.map((item, key) => (
                              <option key={key} value={item[0]}>{item[1]}</option>
                           ))
                        )  
                        :  (
                           Array.isArray(fields) 
                              ? (
                                 data.map((item, key) => (
                                    <option key={key} value={item[fields[0]]}>{item[fields[1]]}</option>
                                 ))
                              )  
                              :  (
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
   );
}