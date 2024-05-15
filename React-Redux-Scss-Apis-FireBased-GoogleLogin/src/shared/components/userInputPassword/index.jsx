import React, { useState } from 'react';
import './userInputPassword.scss';
import openEye from '../../../assets/icons/openEye.svg';
import closeEye from '../../../assets/icons/closeEye.svg';


export default function UserInputPassword(props) {
  const { name ,placeholder , onChange, value} = props;
  const [togglePasswordType, setTogglePasswordType] = useState(true);

  const handleClick = () => {
    setTogglePasswordType(!togglePasswordType);
  }

  return (
    <div className='loginPasswordPart'>
       <img src={togglePasswordType === true ? closeEye : openEye} alt="eye-icon" className='eyeIcon' onClick={() => handleClick()} loading='lazy' />
      <input type={togglePasswordType === true ? 'password' : 'text'} name={name} className='userPassword' placeholder={placeholder} onChange={onChange} value={value}  />
    </div>
  )
}
