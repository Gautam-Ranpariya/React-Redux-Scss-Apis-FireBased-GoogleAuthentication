import React, { useState } from 'react';
import { OTPInputComponent } from '../autoFillOtp/index';
import './otp.scss';
import { useDispatch } from 'react-redux';
import { setUserOtp } from '../../../redux/apiSclices/authSclice';

export default function Otp() {
  const [otps, setOtp] = useState("")

  const dispatch = useDispatch();
  return (
    <div className='mainOtp'>
      <OTPInputComponent
        isNumberInput
        autoFocus
        length={4}
        value={otps?.OTP}
        className="otpContainer"
        inputClassName="input_item"
        onChangeOTP={(otp) => {
          setOtp({ ...otps, OTP: otp });
          dispatch(setUserOtp({...otp,otp:otp}))
        }} 
        handleSubmitOTP ={
          (otps) => {
            console.log(otps)
          }
        }
        />
    </div>
  )
}
