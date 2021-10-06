import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import menuActions from '../../redux/menu/menu.action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import MenuSearch from './MenuSearch'

const fields = ['name', 'url']

export default function Menus() {
   const dispatch = useDispatch()
   const menu = useSelector(store => store.menu)
   
   useEffect(() => {
      dispatch(menuActions.list())
   }, [dispatch]);

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }

   return (
      <CardSimple title='Menus'>
         <MenuSearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={menu}
            fields={fields}
            actions={menuActions}
            url='menus'
            showModal={openSearch}
            scopedSlots={{ 
               'url': (item) => ( <td>{`/${item.url}`}</td> )
            }}
         />
      </CardSimple>
   );
}