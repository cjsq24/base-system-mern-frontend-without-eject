import { notes } from '../actionTypes'

const actions = {
   list: () => async (dispatch, getState) => {
      //Consultamos el estado de country.list, para saber si está vacío
      //Para que no esté consultando al servidor innecesariamente
      //Ya que el useEffect se ejecuta cada vez que se hace focus a la vista
      const {note} = getState()
      if (note.list.length === 0) {
         //Asumimos que esta es la respuesta del servidor
         //const {data} = await axios.post('/users/login', _data)
         const data = {
            values: [{
                  id: 2,
                  title: 'Segunda nota'
               }, {
                  id: 1,
                  title: 'Mi primera nota'
               }
            ],
            success: true,
            message: ''
         }
         await dispatch({ type: notes.LIST_NOTE, payload: data })
      }
   },
	add: (_data) => {
		return async (dispatch) => {
         // <-- Aquí hacemos la petición al endpoint
         //recibimos la respuesta el servidor, que normalmente viene en este formato
         const data = {
            values: _data,
            success: true,
            message: 'Agregado exitosamente'
         }
			await dispatch({ type: notes.ADD_NOTE, payload: data })
		}
	},
   update: (_data) => {
		return async (dispatch) => {
         const data = {
            values: _data,
            success: true,
            message: 'Editado exitosamente'
         }
			await dispatch({ type: notes.UPDATE_NOTE, payload: data })
		}
	},
   delete: (_data) => {
		return async (dispatch) => {
         const data = {
            values: {},
            success: true,
            message: 'Borrado exitosamente'
         }
			await dispatch({ type: notes.DELETE_NOTE, payload: {...data, ..._data} })
         //data es la respuesta del servidor, y adicionalmente le mandamos a _data que
         //nos trae el id desde la vista, ya que en el servidor generalmente vaciamos a data
		}
	},
}

export default actions