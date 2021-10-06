import { ToastContainer } from 'react-toastify'
import Navigator from './Navigator'
import AuthProvider from './auth/AuthProvider';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import './scss/style.scss'

function App() {
  return (
    <AuthProvider>
      <ToastContainer />
      <Navigator />
    </AuthProvider>
  );
}

export default App;