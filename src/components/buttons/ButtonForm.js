import { useHistory } from 'react-router-dom';
import { CButton } from '@coreui/react';
import { FaSave, FaArrowLeft } from 'react-icons/fa'

export default function ButtonForm({loading, action, url, iamModalClose}) {
   const history = useHistory()

   const cancel = () => {
      if (!iamModalClose) {
         history.push(`/${url}`)
      } else {
         iamModalClose()
      }
   }

   return (
      <div className="d-flex justify-content-end">
         <CButton size='md' color='danger' className='mr-2' onClick={cancel} disabled={loading}>
            <FaArrowLeft />{' '}
            Cancel
         </CButton>
         <CButton type='submit' size='md' color={action === 'create' ? 'success' : 'info'} className='' disabled={loading}>
            <FaSave />{' '}
            {action === 'create' ? 'Save' : 'Update'}
         </CButton>
      </div>
   );
}