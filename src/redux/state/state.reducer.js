import { states } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {},
   listFetched: false,
   listLoading: false,
   listByCountry: [],
   listByCountryLoading: false,
   loading: false
};

const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case states.LOADING_STATE:
         return { ...state, loading: true }

      case states.LIST_STATE:
         state.list = (rest.payload.success) ? rest.payload.values : []
         state.listFetched = (rest.payload.success) ? true : false
         return { ...state, listLoading: false }

      case states.LIST_LOADING_STATE:
         return { ...state, listLoading: true }

      case states.LIST_BY_COUNTRY_STATE:
         state.listByCountry = (rest.payload.success) ? rest.payload.values : []
         return { ...state, listByCountryLoading: false }

      case states.LIST_BY_COUNTRY_LOADING_STATE:
         return { ...state, listByCountryLoading: true }

      case states.RESET_LIST_BY_STATE:
         return { ...state, listByCountry: [] }

      case states.CREATE_STATE:
         if (rest.payload.success) {
            state.list.unshift({ ...rest.payload.values }) //Sumamos el registro agregado a la lista
         }
         return { ...state, ...rest, loading: false }

      case states.UPDATE_STATE:
         if (rest.payload.success) {
            const { values } = rest.payload
            state.list = state.list.map(item => item._id === values._id ? { ...item, ...values } : item)
         }
         return { ...state, ...rest, loading: false }

      case states.DELETE_STATE:
         if (rest.payload.success) {
            state.list = state.list.list(item => item._id !== rest.payload._id)
         }
         return { ...state, ...rest, loading: false }

         case states.CHANGE_STATUS_STATE:
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