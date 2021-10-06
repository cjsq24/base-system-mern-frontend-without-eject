import { CButton } from '@coreui/react';
import { FaRedoAlt, FaArrowLeft, FaSearch } from 'react-icons/fa'

export default function ButtonForm({reset, closeSearch}) {

   return (
      <div>
         <CButton color="warning" className='mr-2' onClick={() => reset()}>
            <FaRedoAlt />{' '}
            Reset
         </CButton>
         <CButton color="danger" className='mr-2' onClick={closeSearch}>
            <FaArrowLeft />{' '}
            Cancel
         </CButton>
         <CButton type="submit" color="info">
            <FaSearch />{' '}
            Search
         </CButton>
      </div>
   );
}