const validations = {
   name: { 
      required: 'Ingrese el nombre', 
      minLength: {value: 2, message: 'Debe tener más de 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   },
   code: {
      minLength: {value: 2, message: 'Debe tener mínimo 2 caracteres'},
      maxLength: {value: 2, message: 'No puede tener más de 2 caracteres'}
   },
   country_id: {
      required: 'Seleccione un país'
   }
}

export default validations;