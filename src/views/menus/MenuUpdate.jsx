import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import menuActions from '../../redux/menu/menu.action'
import MenuForm from './MenuForm';
import CardSimple from '../../components/cards/CardSimple';

export default function MenuUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/menus')
      }
   }, [data, history]);

   const onSubmit = async (values) => {
      const res = await dispatch(menuActions.update({...values, _id: data._id}))
      if (res.success) {
         history.push('/menus')
      }
   }

   return (
      <CardSimple title='Update Menu'>
         <MenuForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
         />
      </CardSimple>
   );
}