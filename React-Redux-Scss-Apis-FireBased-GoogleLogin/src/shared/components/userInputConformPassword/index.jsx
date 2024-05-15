import React from 'react';
import './userInputConformPassword.scss';
import lock from '../../../assets/icons/lock.svg';

export default function UserInputConformPassword(props) {
    const { name, placeholder, onChange, value, onKeyDown } = props;
    
  return (
    <div className='loginConformPasswordPart'>
      <img src={lock} alt="lock-icon" className='lockIcon' />
      <input type='password' name={name} className='userConformPassword' placeholder={placeholder} onChange={onChange} value={value} loading='lazy' onKeyDown={onKeyDown} />
    </div>
  )
}
