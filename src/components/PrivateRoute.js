import { Route, Redirect } from 'react-router-dom';
import useAuth from '../auth/useAuth';
import TheLayout from '../containers/TheLayout';

export default function PrivateRoute({ component: Component, ...props }) {
   const path = props.path.replace('/', '')
   const auth = useAuth()

   return (
      <Route {...props}>
         {auth.isLogged() ? (
               <TheLayout path={path}>
                  <Component />
               </TheLayout>
            ) : (
               <Redirect to='/login' />
            )
         }
      </Route>
   );
}