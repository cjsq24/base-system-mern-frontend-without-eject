import { roles } from '../actionTypes'
 
const initialState = {
   payload: {},
   list: [],
   listFetched: false,
   listLoading: true,
   listAll: [],
   listAllFetched: false,
   listAllLoading: true,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case roles.LIST_ROLE:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case roles.LIST_LOADING_ROLE:
         return { ...state, listLoading: true }

      case roles.LOADING_ROLE:
         return { ...state, loading: true }

      case roles.LIST_ALL_ROLE:
         state.listAll = (rest.payload.success) ? rest.payload.values : []
         state.listAllFetched = (rest.payload.success) ? true : false
         return { ...state, listAllLoading: false }

      case roles.LIST_ALL_LOADING_ROLE:
         return { ...state, listAllLoading: true }

      case roles.CREATE_ROLE:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
            state.listAll.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case roles.UPDATE_ROLE:
         if (rest.payload.success) {
            const { values } = rest.payload
            state.list = state.list.map(item => item._id === values._id ? { ...item, ...values } : item)
            state.listAll = state.listAll.map(item => item._id === values._id ? { ...item, ...values } : item)
         }
         return { ...state, ...rest, loading: false }

      case roles.DELETE_ROLE:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item._id !== rest.payload._id)
         }
         return { ...state, ...rest, loading: false }

      case roles.CHANGE_STATUS_ROLE:
         const payload = rest.payload
         if (payload.success) {
            state.list = state.list.map(item => item._id === payload._id ? { ...item, status: payload.status } : item)
            state.listAll = state.listAll.map(item => item._id === payload._id ? { ...item, status: payload.status } : item)
         }
         return { ...state, ...rest, loading: false }

      default:
         return { ...state };
   }
};

export default reducer