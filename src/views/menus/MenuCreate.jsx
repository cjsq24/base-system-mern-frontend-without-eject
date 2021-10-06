import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import menuActions from '../../redux/menu/menu.action'
import MenuForm from './MenuForm';
import CardSimple from '../../components/cards/CardSimple';

export default function MenuCreate() {
   const dispatch = useDispatch()
   const history = useHistory()
   const { register, handleSubmit, formState: {errors} } = useForm();

   const onSubmit = async (values) => {
      const res = await dispatch(menuActions.create(values))
      if (res.success) {
         history.push('/menus')
      }
   }

   return (
      <CardSimple title='Create Menu'>
         <MenuForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            action='create'
         />
      </CardSimple>
   );
}