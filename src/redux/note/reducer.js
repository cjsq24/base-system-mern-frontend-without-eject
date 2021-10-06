import { notes } from '../actionTypes'
 
const initialState = {
   list: [],
   payload: {}
};
 
const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case notes.LIST_NOTE:
         state.list = rest.payload.values
         return { ...state }
      case notes.ADD_NOTE:
         let id = state.list.reduce((maxId, item) => Math.max(item._id, maxId), -1) + 1
         id = (id === 0) ? 1 : id
         state.list.unshift({
            id: id,
            ...rest.payload.values 
         }) //Sumamos el registro agregado a la lista
         return { ...state, ...rest }
      case notes.UPDATE_NOTE:
         state.list = state.list.map(item => 
            item._id === rest.payload.values._id
            ? { ...item, ...rest.payload.values }
            : item
         )
         return { ...state, ...rest }
      case notes.DELETE_NOTE:
         state.list = state.list.filter(item => item._id !== rest.payload._id)
         return { ...state, ...rest }
      default:
         return { ...state };
   }
};

export default reducer