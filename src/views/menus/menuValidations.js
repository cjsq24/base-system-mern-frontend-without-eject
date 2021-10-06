const validations = {
   name: { 
      required: 'Ingrese el nombre', 
      minLength: {value: 2, message: 'Debe tener más de 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   },
   url: { 
      required: 'Ingrese la url',
      minLength: {value: 2, message: 'Debe tener mínimo 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   }
}

export default validations;