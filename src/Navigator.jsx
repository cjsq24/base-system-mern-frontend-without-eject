import {
   BrowserRouter as Router,
   Switch,
   Route
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';

import Register from './views/Register'
import routes from './routes'

import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';

const Navigator = () => {
   return (
      <Router>
         <Switch>
            <PublicRoute path='/register' component={Register} />

            {routes.map((route, key) => {
               if (route.type === 'public') {
                  return <PublicRoute key={key} {...route} />
               } else if (route.type === 'private') {
                  return <PrivateRoute key={key} {...route} />
               } else {
                  return <Route key={key} {...route} />
               }
            })}

         </Switch>
      </Router>
   );
}

export default Navigator;