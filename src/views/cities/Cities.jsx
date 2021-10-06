import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import cityActions from '../../redux/city/city.action'
import CardSimple from '../../components/cards/CardSimple';
import DataTable from '../../components/DataTable';
import CitySearch from './CitySearch'

const fields = ['name', 'code', 'country', 'state']

export default function Cities() {
   const dispatch = useDispatch()
   const city = useSelector(store => store.city)

   useEffect(() => {
      dispatch(cityActions.list())
   }, [dispatch]);

   const [modal, setModal] = useState(false);
   const openSearch = () => {
      setModal(true)
   }
   const closeSearch = () => {
      setModal(false)
   }


   return (
      <CardSimple title='Cities'>
         <CitySearch modal={modal} closeSearch={closeSearch} />
         <DataTable
            items={city}
            fields={fields}
            actions={cityActions}
            url='cities'
            scopedSlots={{
               'country': (item) => (<td>{ item?.state_id?.country_id?.name }</td>),
               'state': (item) => (<td>{ item?.state_id?.name }</td>)
            }}
            showModal={openSearch}
         />
      </CardSimple>
   );
}