const validations = {
   name: { 
      required: 'Ingrese el nombre', 
      minLength: {value: 2, message: 'Debe tener más de 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   },
   key_name: { 
      required: 'Ingrese el key name'
   }
}

export default validations;