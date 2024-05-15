import React from 'react';
import './userInputEmail.scss';
import mail from '../../../assets/icons/mail.svg';

export default function UserInputEmail(props) {
  const { placeholder, name , onChange , value} = props;
  return (
    <div className='loginEmailPart'>
      <img src={mail} alt="mail-icon" className='mailIcon' />
      <input type='email' name={name} className='userEmail' placeholder={placeholder} onChange={onChange} value={value} loading='lazy' />
    </div>
  )
}
