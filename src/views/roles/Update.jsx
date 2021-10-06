import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import roleActions from '../../redux/role/role.action'
import RoleForm from './RoleForm';
import CardSimple from '../../components/cards/CardSimple';

export default function RoleUpdate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const location = useLocation()
   const { data } = location.state || {}
   const { register, handleSubmit, formState: {errors} } = useForm({ defaultValues: data ? data : {} });

   useEffect(() => {
      if (!data) {
         history.push('/roles')
      }
   }, [dispatch]);

   const onSubmit = async (values, modules) => {
      const res = await dispatch(roleActions.update({...values, modules, _id: data._id}))
      if (res.success) {
         history.push('/roles')
      }
   }

   return (
      <CardSimple title='Update Role'>
         <RoleForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='update'
            data={data ? data : {}}
         />
      </CardSimple>
   );
}