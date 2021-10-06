import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import roleActions from '../../redux/role/role.action'
import RoleForm from './RoleForm';
import CardSimple from '../../components/cards/CardSimple';

export default function RoleCreate(props) {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, reset, formState: {errors} } = useForm();

   const onSubmit = async (values, modules) => {
      const res = await dispatch(roleActions.create({...values, modules}))

      if (res.success) {
         if (!props?.iamModal) {
            history.push('/roles')
         } else {
            props.iamModalClose(res.values._id)
            reset()
         }
      }
   }

   return (
      <CardSimple title='Create Role'>
         <RoleForm
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