import React, { createContext, useContext, useState } from 'react'
import { ADD_CONTACT, DELETE_CONTACT, UPDATE_CONTACT } from '../action_types/Action_Types';

const TelephoneDirectoryContext = createContext();

const telephoneDirectoryReducer = (state, action) => {
  switch (action.type) {
    case ADD_CONTACT:
      if(state.contactsInTheDirectory.length === 0) {
        const newPayload = {id:1,...action.payload};
        localStorage.setItem("ContactsInTheDirectory", JSON.stringify([newPayload]));

        return {
          ...state,
          contactsInTheDirectory:[...JSON.parse(localStorage.getItem("ContactsInTheDirectory"))],
        }

      }else {
        const newContactCount = state.contactsInTheDirectory[state.contactsInTheDirectory.length - 1];
        const count = newContactCount.id + 1;
        const newPayload = {id:count, ...action.payload};
        const localStorageGetPreviousValues = [...JSON.parse(localStorage.getItem("ContactsInTheDirectory")), newPayload]
        localStorage.setItem("ContactsInTheDirectory", JSON.stringify(localStorageGetPreviousValues));
      }

      return {
        ...state,
        contactsInTheDirectory:[...JSON.parse(localStorage.getItem("ContactsInTheDirectory"))]
      }

    case DELETE_CONTACT:
      const newContactsInTheDirectory = state.contactsInTheDirectory.filter((item) => item.id !== action.id_);
      localStorage.setItem("ContactsInTheDirectory", JSON.stringify(newContactsInTheDirectory));

      return {
        ...state,
        contactsInTheDirectory:[...JSON.parse(localStorage.getItem("ContactsInTheDirectory"))],
      }
    
    case UPDATE_CONTACT:
      const findContact = state.contactsInTheDirectory.find((contact) => contact.id === action.payload.id);
      findContact.contactName = action.payload.contactName;
      findContact.phoneNumber = action.payload.phoneNumber;

      localStorage.setItem("ContactsInTheDirectory", JSON.stringify(state.contactsInTheDirectory));

      /*
      const indexOf = state.contactsInTheDirectory.indexOf(findContact);
      const newPayload = {
        id:action.payload.id,
        contactName:action.payload.contactName,
        phoneNumber:action.payload.phoneNumber,
      }

      state.contactsInTheDirectory.splice(indexOf,1,newPayload);

      localStorage.setItem("ContactsInTheDirectory", JSON.stringify(state.contactsInTheDirectory));
      */

      return {
        ...state,
        contactsInTheDirectory:[...JSON.parse(localStorage.getItem("ContactsInTheDirectory"))],
      }

    default:
      return {
        ...state,
      }
  }
}

const TelephoneDirectoryProvider = ({ children }) => {
  const [telephoneDirectory, setTelefonDirectory] = useState({
    contactsInTheDirectory:JSON.parse(localStorage.getItem("ContactsInTheDirectory")) || [],
    dispatch:action => {
      setTelefonDirectory((previousTelephoneDirectory) => telephoneDirectoryReducer(previousTelephoneDirectory, action))
    },
  })
  return (
    <TelephoneDirectoryContext.Provider value={telephoneDirectory}>
      { children }
    </TelephoneDirectoryContext.Provider>
  );
}

export const useTelephoneDirectoryContext = () => useContext(TelephoneDirectoryContext);

export default TelephoneDirectoryProvider;
