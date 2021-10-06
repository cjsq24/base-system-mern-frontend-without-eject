import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { menus } from '../actionTypes'

const base = 'menus'

const actions = {
   list: (_data = {}) => async (dispatch, getState) => {
      if (!getState().menu.listFetched || Object.keys(_data).length > 0) {
         await dispatch({ type: menus.LIST_LOADING_MENU })
         const {data} = await axios.get(`/${base}/list`, { params: _data })
         await dispatch({ type: menus.LIST_MENU, payload: data })
         await showAlert(data.message)
      }
   },

   listSelect: (_data = {}) => async (dispatch, getState) => {
      await dispatch({ type: menus.LIST_SELECT_LOADING_MENU })
      const {data} = await axios.get(`/${base}/list-select`, { params: _data })
      await dispatch({ type: menus.LIST_SELECT_MENU, payload: data })
   },

   /*listAll: () => async (dispatch, getState) => {
      if (!getState().menu.listAllFetched) {
         await dispatch({ type: menus.LIST_ALL_LOADING_MENU })
         const {data} = await axios.get(`/${base}/list`)
         await dispatch({ type: menus.LIST_ALL_MENU, payload: data })
         await showAlert(data.message)
      }
   },*/

	create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.post(`/${base}/create`, _data)
      await dispatch({ type: menus.CREATE_MENU, payload: data })
      await showAlert(data.message)
      return data
	},

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.put(`/${base}/update/${_data._id}`, _data)
      await dispatch({ type: menus.UPDATE_MENU, payload: data })
      await showAlert(data.message)
      return data;
	},

   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      const {data} = await axios.delete(`/${base}/delete/${_data._id}`)
      await dispatch({ type: menus.DELETE_MENU, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	},

   changeStatus: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: menus.LOADING_MENU })
      _data.status = (_data.status === '1') ? '0' : '1'
      const {data} = await axios.put(`/${base}/change-status/${_data._id}`, _data)
      await dispatch({ type: menus.CHANGE_STATUS_MENU, payload: {...data, ..._data} })
      await showAlert(data.message)
      return data;
	}
}

export default actions