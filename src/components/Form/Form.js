import React, { useState } from 'react';
import { useTelephoneDirectoryContext } from '../../context/TelephoneDirectoryProvider';
import { ADD_CONTACT } from '../../action_types/Action_Types';
import './form.css';

const initialValues = {contactName:'',phoneNumber:''};

const Form = () => {
  const [form, setForm] = useState(initialValues)
  const { dispatch } = useTelephoneDirectoryContext();

  const onChangeEvent = (e) => {
    setForm({...form, [e.target.name]:e.target.value})
  }

  const onSubmitEvent = (dispatch,e) => {
    e.preventDefault();
    if(form.contactName === '' || form.phoneNumber === '') {
      return;
    }
    dispatch({type:ADD_CONTACT,payload:form});
    setForm(initialValues);
  }

  return (
    <div className="form-wrapper">
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
        type="tel" 
        pattern="[0-9]{4}-[0-9]{3}-[0-9]{4}" 
        placeholder="Contact Phone Number.. (xxxx-yyy-zzzz)" 
        autoComplete="off" 
        required
        />

        <button type="submit">
          Contact Add
        </button>
      </form>
    </div>
  )
}

export default Form;
