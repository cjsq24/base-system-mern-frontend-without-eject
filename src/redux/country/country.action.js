import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { countries } from '../actionTypes'

const base = '/countries'

const actions = {
   list: (_data = {}) => async (dispatch, getState) => {
      //Consultamos el estado de country.list, para saber si está vacío
      //Para que no esté consultando al servidor innecesariamente
      //Ya que el useEffect se ejecuta cada vez que se hace focus a la vista
      if (!getState().country.listFetched || Object.keys(_data).length > 0) {
         dispatch({ type: countries.LIST_LOADING_COUNTRY })
         const {data} = await axios.get(`${base}/list`, {params: _data})
         await dispatch({ type: countries.LIST_COUNTRY, payload: data })
         await showAlert(data.message)
      }
   },

   listAll: () => async (dispatch, getState) => {
      if (!getState().country.listAllFetched) {
         dispatch({ type: countries.LIST_ALL_LOADING_COUNTRY })
         const {data} = await axios.get(`${base}/list`)
         await dispatch({ type: countries.LIST_ALL_COUNTRY, payload: data })
         await showAlert(data.message)
      }
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: countries.LOADING_COUNTRY })
      const {data} = await axios.post(`${base}/create`, _data)
      await dispatch({ type: countries.CREATE_COUNTRY, payload: data })
      await showAlert(data.message)
      return data
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: countries.LOADING_COUNTRY })
      const {data} = await axios.put(`${base}/update/${_data._id}`, _data)
      await dispatch({ type: countries.UPDATE_COUNTRY, payload: data })
      await showAlert(data.message)
      return data;
	},
   
   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: countries.LOADING_COUNTRY })
      const {data} = await axios.delete(`${base}/delete/${_data._id}`)
      await dispatch({ type: countries.DELETE_COUNTRY, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},

   changeStatus: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: countries.LOADING_COUNTRY })
      _data.status = (_data.status === '1') ? '0' : '1'
      const {data} = await axios.put(`${base}/change-status/${_data._id}`, _data)
      await dispatch({ type: countries.CHANGE_STATUS_COUNTRY, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions