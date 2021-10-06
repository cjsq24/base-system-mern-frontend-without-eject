import axios from '../../helpers/interceptor'
import { showAlert, loadingAlert } from '../../helpers/handleAlert'
import { states } from '../actionTypes'

const base = '/states'

const actions = {
   list: (_data = {}) => async (dispatch, getState) => {
      const { state } = getState()
      if (!state.listFetched || Object.keys(_data).length > 0) {
         await dispatch({ type: states.LIST_LOADING_STATE })
         const { data } = await axios.get(`${base}/list`, { params: _data })
         showAlert(data.message)
         dispatch({ type: states.LIST_STATE, payload: data })
      }
   },

   listByCountry: (_data = {}, state = null) => async (dispatch, getState) => {
      if (!state) {
         await dispatch({ type: states.LIST_BY_COUNTRY_LOADING_STATE })
         const { data } = await axios.get(`${base}/list`, { params: _data })
         await dispatch({ type: states.LIST_BY_COUNTRY_STATE, payload: data })
         return data;
      } else if (Object.keys(state).length > 0) { //Cuando es una modal
         await dispatch({ type: states.LIST_BY_COUNTRY_LOADING_STATE })
         const { listByCountry } = getState().state
         listByCountry.push(state)
         dispatch({ type: states.LIST_BY_COUNTRY_STATE, payload: { success: true, values: listByCountry } })
      }
   },

   resetListBy: () => async (dispatch) => {
      dispatch({ type: states.RESET_LIST_BY_STATE })
   },

   create: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const { data } = await axios.post(`${base}/create`, _data)
      await dispatch({ type: states.CREATE_STATE, payload: data })
      await showAlert(data.message)
      return data;
   },

   update: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const { data } = await axios.put(`${base}/update/${_data._id}`, _data)
      await dispatch({ type: states.UPDATE_STATE, payload: data })
      await showAlert(data.message)
      return data;
   },

   delete: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      const { data } = await axios.delete(`${base}/delete/${_data._id}`)
      await dispatch({ type: states.DELETE_STATE, payload: { ...data, ..._data } })
      await showAlert(data.message)
      return data;
   },

   changeStatus: (_data) => async (dispatch) => {
      await loadingAlert();
      await dispatch({ type: states.LOADING_STATE })
      _data.status = (_data.status === '1') ? '0' : '1'
      const { data } = await axios.put(`${base}/change-status/${_data._id}`, _data)
      await dispatch({ type: states.CHANGE_STATUS_STATE, payload: { ...data, ..._data } })
      await showAlert(data.message)
      return data;
   }
}

export default actions