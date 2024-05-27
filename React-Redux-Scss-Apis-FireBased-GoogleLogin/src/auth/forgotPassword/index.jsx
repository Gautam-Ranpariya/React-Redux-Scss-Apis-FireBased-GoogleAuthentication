import React, { lazy } from 'react'
import './forgotPassword.scss';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendOtpMail, setForgotPasswordEmailData, setIsForgotEmail } from '../../redux/apiSclices/authSclice';
import { useDispatch, useSelector } from 'react-redux';
import facebookIcon from '../../assets/icons/facebook.svg';
import googleIcon from '../../assets/icons/google.svg';
import linkedInIcon from '../../assets/icons/linkedIn.svg';
import AuthDesktop from '../../assets/images/authDesktop.png';
import authForgotPassword from '../../assets/images/auth-forgotPassword.png';

const UserInputEmail = lazy(() => import('../../shared/components/userInputEmail'));
const ModerateButton = lazy(() => import('../../shared/components/moderateButton'));
const SocialMediaButton = lazy(() => import('../../shared/components/socialMediaButton'));



export default function ForgotPassword() {

  const { forgotEmail, loading } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(setForgotPasswordEmailData(value))
  };

  const handleClick = async () => {
    const email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if ((forgotEmail === '') || (forgotEmail?.length === 0)) {
      toast.error('Please Enter Your Email');
    }
    else if (!email_pattern.test(forgotEmail)) {
      toast.error('Please Enter a Your Correct Email ');
    }
    else {
      await dispatch(sendOtpMail(forgotEmail)).then((res) => {
        console.log('sendOtpMail',res?.payload);
        dispatch(setIsForgotEmail(true));
        navigate('/verificationCode');
      });
    }
  }

  return (
    <>
      <div>
        <div className="mainForgotPassword">
          <div className="vectorTop"></div>
          <div className="vectorBottom"></div>
          <div className="container">
            <div className="innerForgotPassword">
              <div className="imagePart">
                <img src={AuthDesktop} alt="authDesktopImage" className='auth' loading='lazy' />
                <img src={authForgotPassword} alt="auth-forgotPassword" className='auth-forgotPassword' loading='lazy' />
              </div>
              <div className="forgotPasswordPart">
                <div className="verificationForm">
                  <div className="forgotPasswordHeadingPart">
                    <p className='forgotPasswordHeading'>Forgot Password</p>
                    <p className='forgotPasswordHeadingDescription'>Enter the email address associated with your accuont</p>
                  </div>
                  <UserInputEmail name="email" placeholder="Enter your Email" onChange={(e) => handleChange(e)} value={forgotEmail} />
                  <ModerateButton text="Send" onClick={(e) => handleClick(e)} disabled={loading === 'pending' ? true : false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
