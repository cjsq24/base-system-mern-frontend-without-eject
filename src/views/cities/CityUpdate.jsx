import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import cityActions from '../../redux/city/city.action'
import countryActions from '../../redux/country/country.action'
import stateActions from '../../redux/state/state.action'
import CityForm from './CityForm';
import CardSimple from '../../components/cards/CardSimple';

export default function CityUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors}, setValue } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/cities')
         return
      }
      const getSetSelect = async () => {
         await dispatch(countryActions.list())
         await dispatch(stateActions.listByCountry({country_id: data?.state_id?.country_id._id}))
         
         setValue('country_id', data?.state_id?.country_id?._id)
         setValue('state_id', data?.state_id?._id)
      }
      getSetSelect()
   }, [data, history, setValue, dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(cityActions.update({...values, _id: data._id}))
      if (res.success) {
         history.push('/cities')
      }
   }

   return (
      <CardSimple title='Update City'>
         <CityForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
            data={data}
         />
      </CardSimple>
   );
}