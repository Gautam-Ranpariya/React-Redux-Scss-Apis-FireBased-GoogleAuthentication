import './signup.scss';
import React, { lazy, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthDesktop from '../../assets/images/authDesktop.png';
import { Link, useNavigate } from 'react-router-dom';
import { alreadyUser, sendOtpMail, setNewUserData } from '../../redux/apiSclices/authSclice';
import authSignUp from '../../assets/images/auth-signUp.png';
import ValidateUserRegistration from '../../validation/signUp-forgotPasswordValidation';

const UserInputConformPassword = lazy(() => import('../../shared/components/userInputConformPassword'));
const UserInputEmail = lazy(() => import('../../shared/components/userInputEmail'));
const UserInputPassword = lazy(() => import('../../shared/components/userInputPassword'));
const ModerateButton = lazy(() => import('../../shared/components/moderateButton'));


export default function SignUp() {


  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [enterDisabled, setEnterDisabled] = useState(false);

  const { loading, user } = useSelector(state => state.auth);


  // enter key disabled :)
  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && !enterDisabled) {
      setEnterDisabled(true);
      handleClick();
    }
  }


  // handle chnage :)
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setNewUserData({ name, value }));
  }


  // submit user data :)
  const handleClick = async () => {
    if (ValidateUserRegistration(user)) {
      dispatch(alreadyUser(user?.email)).then((res) => {
        if (res?.payload?.alreadyUser === false) {
          dispatch(sendOtpMail(user?.email)).then((res) => {
            if (res?.payload?.mailSend) {
              navigate('/verificationCode');
            }
            else { console.log('mail not send'); }
          })
            .catch((err) => {
              console.log("error :-- send otp catch --", err);
            toast.error('something went wrong please try again !');
            })
            .catch((err) => {
              console.log("error :-- verified otp catch --", err);
              toast.error('something went wrong please try again !');
            })
        }
        else {
          navigate('/login');
        }
      })
        .catch((err) => {
          console.log("error :--", err);
          toast.error('something went wrong please try again !');
        })
    }
  }



  return (
    <>
      <div>
        <div className="mainSignUp">
          <div className="vectorTop"></div>
          <div className="vectorBottom"></div>
          <div className="container">
            <div className="innerSignUp">
              <div className="imagePart">
                <img src={AuthDesktop} alt="authDesktopImage" className='auth' loading='lazy' />
                <img src={authSignUp} alt="auth-signUp" className='auth-signUp' loading='lazy' />
              </div>
              <div className="signUpPart">
                <div className="signUpForm">
                  <div className="signUpHeadingPart">
                    <p className='signUpHeading'>Sign Up</p>
                  </div>
                  <UserInputEmail name="email" placeholder="Enter Your Email" onChange={(e) => handleChange(e)} value={user.email} />
                  <UserInputPassword name="password" placeholder="Enter Your Password" onChange={(e) => handleChange(e)} value={user.password} />
                  <UserInputConformPassword name="conformPassword" placeholder="Confiram Password" onChange={(e) => handleChange(e)} value={user.conformPassword} onKeyDown={(e) => handleKeyDown(e)} />
                  <ModerateButton text="Sign Up" onClick={(e) => handleClick(e)} disabled={loading === 'pending' ? true : false} />
                  <div className="accountOptionPart">
                    <p className='accountDescription'>Alreay have an accout? <Link to={'/login'} className='signUpLink'>Sing In</Link></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
