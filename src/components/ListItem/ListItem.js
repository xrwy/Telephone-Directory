import React from 'react'
import { DELETE_CONTACT } from '../../action_types/Action_Types';
import { useTelephoneDirectoryContext } from '../../context/TelephoneDirectoryProvider'

const ListItem = ({id,nameOrSurname, phone, setId}) => {
  const { dispatch } = useTelephoneDirectoryContext();

  return (
    <tr>
      <td>{ nameOrSurname }</td>
      <td>{ phone }</td>
      <td className="btn" onClick={() => dispatch({type:DELETE_CONTACT,id_:id})}>
        <i className="fa fa-trash-o"></i>
      </td>
      <td className="btn" onClick={() => setId(id)}>
        <i className="fa fa-edit"></i>
      </td>
    </tr>
  )
}

export default ListItem;
