import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import countryActions from '../../redux/country/country.action'
import CountryForm from './CountryForm';
import CardSimple from '../../components/cards/CardSimple';

export default function CountryCreate(props) {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors}, reset } = useForm();

   const onSubmit = async (values) => {
      const res = await dispatch(countryActions.create(values))
      if (res.success) {
         if (!props?.iamModal) {
            history.push('/countries')
         } else {
            props?.iamModalClose(res.values._id)
            reset()
         }
      }
   }

   return (
      <CardSimple title='Create Country'>
         <CountryForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
            iamModalClose={props?.iamModalClose}
         />
      </CardSimple>
   );
}