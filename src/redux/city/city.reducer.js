import { cities } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: false,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case cities.LOADING_CITY:
         return { ...state, loading: true }

      case cities.LIST_CITY:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case cities.LIST_LOADING_CITY:
         return { ...state, listLoading: true }

      case cities.CREATE_CITY:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case cities.UPDATE_CITY:
         if (rest.payload.success) {
            const { values } = rest.payload
            state.list = state.list.map(item => item._id === values._id ? { ...item, ...values } : item)
         }
         return { ...state, ...rest, loading: false }

      case cities.DELETE_CITY:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item._id !== rest.payload._id)
         }
         return { ...state, ...rest, loading: false }

      case cities.CHANGE_STATUS_CITY:
         const payload = rest.payload
         if (payload.success) {
            state.list = state.list.map(item => item._id === payload._id ? { ...item, status: payload.status } : item)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer