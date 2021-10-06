import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import userActions from '../../redux/user/user.action'
import roleActions from '../../redux/role/role.action'
import UserForm from './UserForm';
import CardSimple from '../../components/cards/CardSimple';

export default function UserCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, setValue, formState: {errors} } = useForm();

   useEffect(() => {
      dispatch(roleActions.listAll())
   }, [dispatch]);

   const onSubmit = async (values) => {
      const res = await dispatch(userActions.create(values))
      if (res.success) {
         history.push('/users')
      }
   }

   return (
      <CardSimple title='User Create'>
         <UserForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
            setValue={setValue}
         />
      </CardSimple>
   );
}