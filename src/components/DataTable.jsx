import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CDataTable, CBadge, CButton, CCol, CRow } from '@coreui/react';
import ModalChangeStatus from './modals/ModalChangeStatus';
import { FaPlus, FaSearch, FaEdit, FaBan, FaRedoAlt } from 'react-icons/fa'
//import {  } from '@fortawesome/free-solid-svg-icons'

export default function DataTable(props) {
   const [modalStatus, setModalStatus] = useState(false);
   const [dataStatus, setDataStatus] = useState({});

   const fields = [
      '#',
      ...props.fields,
      { key: 'status', _style: {} },
      {
         key: 'actions',
         label: '',
         //_style: { width: '15%' },
         sorter: false,
         filter: false
      }
   ]

   const dispatch = useDispatch()
   const history = useHistory()

   const getBadge = (status) => {
      switch (status) {
         case '1': return 'success'
         case '0': return 'secondary'
         default: return 'primary'
      }
   }

   const showCreate = () => {
      history.push(`/${props.url}/create`)
   }

   const showUpdate = (item) => {
      history.push(`/${props.url}/update`, { data: item })
   }
   
   const showChangeStatus = (_id, status) => {
      setModalStatus(true)
      setDataStatus({_id, status})
   }

   const changeStatus = async () => {
      await dispatch(props.actions.changeStatus(dataStatus))
   }

   return (
      <CCol>
         <CRow>
            <CCol className='d-flex justify-content-end mb-2'>
               <CButton size='md' color='secondary' className='mr-1' onClick={props.showModal}>
                  <FaSearch />
               </CButton>
               <CButton size='md' color='success' className='' onClick={showCreate}>
                  <FaPlus />
               </CButton>
            </CCol>
         </CRow>

         <CDataTable
            size='sm'
            addTableClasses={'datatable'}
            items={props.items.list}
            fields={fields}
            itemsPerPage={10}
            hover
            sorter
            pagination
            loading={props.items.listLoading}
            striped
            responsive
            scopedSlots={{
               ...props?.scopedSlots,
               '#': 
                  (item, key) => (
                     <td>{key + 1}</td>
                  ),
               'status':
                  (item) => (
                     <td>
                        <CBadge color={getBadge(item.status)}>
                           {item.status === '1' ? 'Active' : 'Inactive'}
                        </CBadge>
                     </td>
                  ),
               'actions':
                  (item) => {
                     return (
                        <td className="py-2 d-flex justify-content-end">
                           <CButton size="sm" color="info" onClick={() => showUpdate(item)}>
                              <FaEdit />
                           </CButton>
                           {
                              item.status === '1' ? (
                                 <CButton size="sm" color="danger" className="ml-1" onClick={() => showChangeStatus(item._id, item.status)}>
                                    <FaBan />
                                 </CButton>
                              ) : (
                                 <CButton size="sm" color="secondary" className="ml-1" onClick={() => showChangeStatus(item._id, item.status)}>
                                    <FaRedoAlt />
                                 </CButton>
                              )
                           }
                        </td>
                     )
                  }
            }}
         />

         <ModalChangeStatus show={modalStatus} close={() => setModalStatus(false)} changeStatus={changeStatus} dataStatus={dataStatus} loading={props.items.loading} />
      </CCol>
   );
}