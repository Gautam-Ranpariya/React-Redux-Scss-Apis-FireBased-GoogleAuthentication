import React, { lazy, useEffect } from 'react'
import './verificationCode.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetUserData, signUpUser, verifyForgotPasswordData } from '../../redux/apiSclices/authSclice';
import AuthDesktop from '../../assets/images/authDesktop.png';
import authVerificationCode from '../../assets/images/auth-verificationCode.png';
import ModerateButton from '../../shared/components/moderateButton';
import Otp from './otp/otp';


export default function VerificationCode() {

  const { loading, userOtp, user } = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // verify userData or ForgotEmail render time :) 
  // useEffect(() => {
  //   if (user) {
  //     if (verifyUserData(user) === false) {
  //       <Navigate to={'/signup'} replace />;
  //     }
  //   }
  //   else if (forgotPassEmail) {
  //     if (verifyForgotPasswordEmail(forgotPassEmail) === false) {
  //       <Navigate to={'/forgotPassword'} replace />;

  //     }
  //   }
  //   else {
  //     <Navigate to={'/signup'} replace />;
  //   }
  // });


  // verify userData is correct after signup or not :)
  const verifyUserData = (user) => {
    let isValid = false;
    const email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    if ((user.email === "") || (!email_pattern.test(user.email)) || (user.password === "") || (!password_pattern.test(user.password))) {
      navigate('/signup');
      toast.error('Please sign up first');
      return isValid;
    }
    else {
      isValid = true;
      return isValid;
    }
  }


  //verify forgotPassword user email :)
  const verifyForgotPasswordEmail = (email) => {
    const email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    let isValid = false;
    if ((email === "") || (!email_pattern.test(email))) {
      navigate('/forgotPassword');
      toast.error('Please Enter Your Valid Email');
      return isValid;
    }
    else {
      isValid = true;
      return isValid;
    }
  }


  // submit the verification code :)
  const handleClick = async (e) => {

    // for new user signup :)
    if (user) {
      if (verifyUserData(user) === false) {
        navigate('/signup');
        toast.error('Please sign up first');
        return;
      }

      // check otp length :)
      if (userOtp.length === 0 || userOtp.length < 4 || userOtp === 'init') {
        toast.error('Please Valid Enter OTP');
        return;
      }

      // signup api call :)
      await dispatch(signUpUser({ user, userOtp }))
        .then((res) => {
          console.log('signUpUser log#########', res);
          if (res.payload.newUser && res.payload.msg === 'new add user') {
            dispatch(resetUserData());
            navigate('/login');
          }
          else if (res.payload.msg === 'otp wrong') {
            toast.error("Please Enter Valid OTP");
          }
          else { console.log('something is wrong!!'); }
        })
        .catch((err) => {
          console.log("error :-- send otp catch --", err.response);
        })
    }

    // for forgot password :)
    // else if (forgotPassEmail) {
    //   if (verifyForgotPasswordEmail(forgotPassEmail) === false) {
    //     navigate('/forgotPassword');
    //     toast.error('Please Enter Your Valid Email');
    //     return;
    //   }

    // check otp length :)
    // if (userOtp.length === 0 || userOtp.length < 4 || userOtp === 'init') {
    //   toast.error('Please Valid Enter OTP');
    //   return;
    // }

    // forgot password api call :)
    //   await dispatch(verifyForgotPasswordData({ forgotPassEmail, userOtp }))
    //     .then((res) => {
    //       if (res.payload.verified && res.payload.msg === 'user is verified') {
    //         // localStorage.setItem('forgotPassOtp', userOtp);
    //         navigate('/resetPassword');
    //       }
    //       else if (res.payload.response.data.msg === 'otp wrong') {
    //         toast.error("Please Enter Valid OTP");
    //       }
    //       else { console.log('something is wrong!!'); }
    //     })
    //     .catch((err) => {
    //       console.log("error :-- send otp catch --", err);
    //       // localStorage.removeItem('newUserData');
    //       // localStorage.removeItem('forgotPassEmail');
    //     })
    // }
    // else {
    //   navigate('/signup');
    // }
  }

  return (
    <>
      <div>
        <div className="mainVerificationCode">
          <div className="vectorTop"></div>
          <div className="vectorBottom"></div>
          <div className="container">
            <div className="innerVerificationCode">
              <div className="imagePart">
                <img src={AuthDesktop} alt="authDesktopImage" className='auth' loading='lazy' />
                <img src={authVerificationCode} alt="auth-verificationCode" className='auth-verificationCode' loading='lazy' />
              </div>
              <div className="verificationCodePart">
                <div className="verificationForm">
                  <div className="verificationCodeHeadingPart">
                    <p className='verificationCodeHeading'>Verification Code</p>
                    <p className='verificationCodeHeadingDescription'>Enter the Verification Code we just send you email Addres</p>
                  </div>
                  <div className="verificationCodeBorderVector"></div>
                  <Otp />
                  <ModerateButton text="Next" onClick={(e) => handleClick(e)} disabled={loading === 'pending' ? true : false} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
