import { menus } from '../actionTypes'
 
const initialState = {
   payload: {},
   list: [],
   listFetched: false,
   listLoading: true,
   listSelect: [],
   listSelectFetched: false,
   listSelectLoading: true,
   loading: false
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case menus.LIST_MENU:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case menus.LIST_LOADING_MENU:
         return { ...state, listLoading: true }

      case menus.LIST_SELECT_MENU:
         state.listSelect = (rest.payload.success) ? rest.payload.values : []
         state.listSelectFetched = (rest.payload.success) ? true : false
         return { ...state, listSelectLoading: false }

      case menus.LIST_SELECT_LOADING_MENU:
         return { ...state, listSelectLoading: true }

      case menus.LOADING_MENU:
         return { ...state, loading: true }

      case menus.CREATE_MENU:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values })
            state.listAll.unshift({ ...rest.payload.values })
         }
         return { ...state, ...rest, loading: false }

      case menus.UPDATE_MENU:
         if (rest.payload.success) {
            const { values } = rest.payload
            state.list = state.list.map(item => item._id === values._id ? { ...item, ...values } : item)
            state.listAll = state.listAll.map(item => item._id === values._id ? { ...item, ...values } : item)
         }
         return { ...state, ...rest, loading: false }

      case menus.DELETE_MENU:
         if (rest.payload.success) {
            state.list = state.list.filter(item => item._id !== rest.payload._id)
         }
         return { ...state, ...rest, loading: false }

      case menus.CHANGE_STATUS_MENU:
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