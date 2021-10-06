import { combineReducers } from 'redux'
import sidebar from './sidebar/sidebar.reducer'
import user from './user/user.reducer'
import country from './country/country.reducer'
import state from './state/state.reducer'
import city from './city/city.reducer'
import menu from './menu/menu.reducer'
import role from './role/role.reducer'

const rootReducer = combineReducers({
   sidebar,
   user,
   country,
   state,
   city,
   menu,
   role
})
 
export default rootReducer
