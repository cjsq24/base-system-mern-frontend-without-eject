import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import userActions from '../../redux/user/user.action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import UserSearch from './UserSearch'

const fields = ['name', 'email', 'role']

export default function Users() {
   const dispatch = useDispatch()
   const user = useSelector(store => store.user)

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }

   useEffect(() => {
      dispatch(userActions.list())
   }, [dispatch]);

   return (
      <CardSimple title='Users'>
         <UserSearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={user}
            fields={fields}
            actions={userActions}
            url='users'
            scopedSlots={{ 
               'name': (item) => ( <td>{`${item.name} ${item.last_name}`}</td> ),
               'role': (item) => ( <td>{item?.role_id?.name}</td> ) 
            }}
            showModal={openSearch}
         />
      </CardSimple>
   );
}