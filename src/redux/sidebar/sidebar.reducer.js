const initialState = {
   show: 'responsive'
}

const reducer = (state = initialState, { type, ...rest }) => {
   switch (type) {
      case 'SET_SIDEBAR':
         return { ...state, ...rest }
      default:
         return state
   }
}

export default reducer