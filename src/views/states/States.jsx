import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import stateActions from '../../redux/state/state.action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import StateSearch from './StateSearch'

const fields = ['name', 'code', 'country']

export default function States() {
   const dispatch = useDispatch()
   const state = useSelector(store => store.state)
   
   useEffect(() => {
      dispatch(stateActions.list())
   }, [dispatch]);

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }


   return (
      <CardSimple title='States'>
         <StateSearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={state}
            fields={fields}
            actions={stateActions}
            url='states'
            scopedSlots={{ 'country': (item) => ( <td>{item?.country_id?.name}</td> ) }}
            showModal={openSearch}
         />
      </CardSimple>
   );
}