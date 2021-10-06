import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { cities } from '../actionTypes'

const base = '/cities'

const actions = {
   list: (_data = {}) => async (dispatch, getState) => {
      const {city} = getState()
      if (!city.listFetched || Object.keys(_data).length > 0) {
         dispatch({ type: cities.LIST_LOADING_CITY })
         const {data} = await axios.get(`${base}/list`, { params: _data })
         showAlert(data.message)
         await dispatch({ type: cities.LIST_CITY, payload: data })
      }
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: cities.LOADING_CITY })
      const {data} = await axios.post(`${base}/create`, _data)
      await dispatch({ type: cities.CREATE_CITY, payload: data })
      await showAlert(data.message)
      return data;
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: cities.LOADING_CITY })
      const {data} = await axios.put(`${base}/update/${_data._id}`, _data)
      await dispatch({ type: cities.UPDATE_CITY, payload: data })
      await showAlert(data.message)
      return data;
	},

   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: cities.LOADING_CITY })
      const {data} = await axios.delete(`${base}/delete/${_data._id}`)
      await dispatch({ type: cities.DELETE_CITY, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},

   changeStatus: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: cities.LOADING_CITY })
      _data.status = (_data.status === '1') ? '0' : '1'
      const {data} = await axios.put(`${base}/change-status/${_data._id}`, _data)
      await dispatch({ type: cities.CHANGE_STATUS_CITY, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions