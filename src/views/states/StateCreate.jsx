import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import stateActions from '../../redux/state/state.action'
import countryActions from '../../redux/country/country.action'
import StateForm from './StateForm';
import CardSimple from '../../components/cards/CardSimple';

export default function StateCreate(props) {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, setValue, reset, formState: {errors} } = useForm();

   useEffect(() => {
      dispatch(countryActions.listAll())
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(stateActions.create(values))
      if (res.success) {
         if (!props?.iamModal) {
            history.push('/states')
         } else {
            props?.iamModalClose(res.values)
            reset()
         }
      }
   }

   return (
      <CardSimple title='Create State'>
         <StateForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            setValue={setValue}
            register={register}
            errors={errors}
            action='create'
            iamModalClose={props?.iamModalClose}
         />
      </CardSimple>
   );
}