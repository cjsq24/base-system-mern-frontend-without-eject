import { CLabel } from '@coreui/react';

export default function Label(props) {
   const { title, id, validations } = props
   
   return (
      <CLabel htmlFor={id}>
         {title}
         {validations && validations[id] && validations[id]?.required &&
            <span className='text-danger ml-1'>(*)</span>
         }
      </CLabel>
   );
}