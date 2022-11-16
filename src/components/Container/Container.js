import React from 'react'
import List from '../List/List';
import Form from '../Form/Form';
import './container.css';

const Container = () => {
  return (
    <div className='wrapper-container'>
      <div className='centered-box'>
        <List />
        <Form />
      </div>
    </div>
  )
}

export default Container
