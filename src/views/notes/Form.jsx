import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import noteActions from '../../redux/note/action'

const Form = (props) => {
   const dispatch = useDispatch()
   const [title, setTitle] = useState('')
   const { action } = props

   useEffect(() => {
      if (props.data) {
         setTitle(props.data.title)
      }
   }, [props.data])

   const submit = async (e) => {
      e.preventDefault();
      if (title !== '') {
         if (action === 'add') {
            dispatch(noteActions.add({
               title: title
            }))
         } else {
            dispatch(noteActions.update({
               id: props.data._id,
               title: title
            }))
         }
         setTitle('')
         props.cancelUpdate()
      }
   }

   const cancelUpdate = () => {
      setTitle('')
      props.cancelUpdate()
   }

   return (
      <div style={{ padding:10, backgroundColor:'#8ED1F8' }}>
         <form onSubmit={submit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button>{(action === 'add') ? 'Add' : 'Update'}</button>
            {action === 'update' && 
               <button onClick={cancelUpdate}>Cancel</button>
            }
         </form>
      </div>
   );
}

export default Form