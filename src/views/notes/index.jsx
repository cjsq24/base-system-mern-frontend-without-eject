import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Form from './Form'
import noteActions from '../../redux/note/action'

const Notes = (props) => {
   const dispatch = useDispatch()
   const note = useSelector(store => store.note)
   const [action, setAction] = useState('add')
   const [data, setData] = useState(null)

   const deleteNote = async (id) => {
      dispatch(noteActions.delete({ id: id }))
   }

   //Este useEffect sería como el componentWillMount
   //Buscamos el listado de notas registradas y la almacenamos en redux
   useEffect(() => {
      dispatch(noteActions.list())
   }, [dispatch])

   const showUpdate = (data) => {
      setAction('update')
      setData(data)
   }

   const cancelUpdate = () => {
      setAction('add')
      setData(null)
   }

   return (
      <div style={{padding:20, backgroundColor:'#F8A18E'}}>
         <p>Notes:</p>
         <Form action={action} cancelUpdate={cancelUpdate} setAction={setAction} data={data} />
         <table border="1" style={{padding:5}}>
            <thead>
               <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th></th>
               </tr>
            </thead>
            <tbody>
               {note.list.map((item, key) => (
                  <tr key={key}>
                     <td>{ item._id }</td>
                     <td>{ item.title }</td>
                     <td>
                        <button type='button' onClick={() => showUpdate(item)} style={{marginLeft:5}}>Update</button>
                        <button type='button' onClick={() => deleteNote(item._id)} style={{marginLeft:5}}>Delete</button>
                     </td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>
   );
}

export default Notes;