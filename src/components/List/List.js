import React, { useState } from 'react'
import { UPDATE_CONTACT } from '../../action_types/Action_Types';
import { useTelephoneDirectoryContext } from '../../context/TelephoneDirectoryProvider';
import ListItem from '../ListItem/ListItem';
import './list.css';

const initialValues = {contactName:'',phoneNumber:''};

const List = () => {
  const [id, setId] = useState(0);
  const [form, setForm] = useState(initialValues);
  const { dispatch } = useTelephoneDirectoryContext();

  const onChangeEvent = (e) => {
    setForm({...form,[e.target.name]:e.target.value})
  }

  const onSubmitEvent = (dispatch,e) => {
    e.preventDefault();
    if(form.contactName === '' || form.phoneNumber === '') {
      return;
    }
    dispatch({type:UPDATE_CONTACT,payload:{id,...form}});
    setForm(initialValues);
  }

  const { contactsInTheDirectory } = useTelephoneDirectoryContext();
  return (
    <div className="list-wrapper">
      <table className="w-100">
        <thead>
          <tr>
            <th><h2>Contact Name</h2></th>
            <th><h2>Contact Phone Number</h2></th>
            <th><h2>Contact Delete</h2></th>
            <th><h2>Contact Update</h2></th>
          </tr>
        </thead>
        {
          contactsInTheDirectory.length > 0 ?
          <tbody className="contact-found">
            {
              contactsInTheDirectory.map((item, index) => {
                return (
                    <ListItem key={item.id} id={item.id} nameOrSurname={item.contactName} phone={item.phoneNumber} setId={setId} />
                )
              })
            }
          </tbody>
          :
          <tbody className="not-contact">
            <tr>
              <td colSpan={4}>
                No Contact Found in Phonebook
              </td>
            </tr>
          </tbody>
        }
      </table>
      {
          id !== 0 ? 
            <div className="absolute">
              <div className="update-box">
                <div className="w-100">
                  <div className="close-icon">
                    <i onClick={() => setId(0)} className="fa fa-close"></i>
                  </div>
                </div>
                <form onSubmit={(e) => onSubmitEvent(dispatch,e)}>
                  <input 
                  value={form.contactName} 
                  onChange={(e) => onChangeEvent(e)} 
                  name="contactName" 
                  type="text" 
                  placeholder="Contact Name and Surname.." 
                  autoComplete="off" 
                  required
                  />

                  <input 
                  value={form.phoneNumber} 
                  onChange={(e) => onChangeEvent(e)} 
                  name="phoneNumber" 
                  type="text" 
                  pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" 
                  placeholder="Contact Phone Number.. (xxxx-yyy-zzzz)" 
                  autoComplete="off" 
                  required
                  />

                  <button type="submit">
                    Contact Update
                  </button>
                </form>
              </div>
            </div>
            :
            null
          }
    </div>
  )
}

export default List
