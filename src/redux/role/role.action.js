import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { roles } from '../actionTypes'

const base = '/roles'

const actions = {
   list: (_data = {}) => async (dispatch, getState) => {
      if (!getState().role.listFetched || Object.keys(_data).length > 0) {
         await dispatch({ type: roles.LIST_LOADING_ROLE })
         const {data} = await axios.get(`${base}/list`, { params: _data })
         await dispatch({ type: roles.LIST_ROLE, payload: data })
         await showAlert(data.message)
      }
   },

   listAll: () => async (dispatch, getState) => {
      if (!getState().role.listAllFetched) {
         dispatch({ type: roles.LIST_ALL_LOADING_ROLE })
         const {data} = await axios.get(`${base}/list`)
         await dispatch({ type: roles.LIST_ALL_ROLE, payload: data })
         await showAlert(data.message)
      }
   },

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.post(`${base}/create`, _data)
      await dispatch({ type: roles.CREATE_ROLE, payload: data })
      await showAlert(data.message)
      return data
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.put(`${base}/update/${_data._id}`, _data)
      await dispatch({ type: roles.UPDATE_ROLE, payload: data })
      await showAlert(data.message)
      return data;
	},
   
   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      const {data} = await axios.delete(`${base}/delete/${_data._id}`)
      await dispatch({ type: roles.DELETE_ROLE, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},

   changeStatus: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: roles.LOADING_ROLE })
      _data.status = (_data.status === '1') ? '0' : '1'
      const {data} = await axios.put(`${base}/change-status/${_data._id}`, _data)
      await dispatch({ type: roles.CHANGE_STATUS_ROLE, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions