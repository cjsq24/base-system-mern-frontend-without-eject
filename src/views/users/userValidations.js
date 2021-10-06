const validations = {
   name: { 
      required: 'Ingrese el nombre', 
      minLength: {value: 2, message: 'Debe tener más de 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   },
   last_name: { 
      required: 'Ingrese el apellido', 
      minLength: {value: 2, message: 'Debe tener más de 2 caracteres'},
      maxLength: {value: 20, message: 'No puede tener más de 20 caracteres'}
   },
   email: { 
      required: 'Ingrese el correo',
      pattern: { 
         value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 
         message: 'Ingrese un email válido'
      },
      //minLength: {value: 2, message: 'Debe tener mínimo 2 caracteres'},
      //maxLength: {value: 2, message: 'No puede tener más de 2 caracteres'}
   },
   role_id: { 
      required: 'Seleccione un rol'
   },
}

export default validations;