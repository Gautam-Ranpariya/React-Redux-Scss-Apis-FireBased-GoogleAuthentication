import React from 'react'
import './resetPassword.scss';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgorPassword, setForgotPasswordData} from '../../redux/apiSclices/authSclice';
import AuthDesktop from '../../assets/images/authDesktop.png';
import authResetPassword from '../../assets/images/auth-resetPassword.png';

const UserInputPassword = lazy(() => import('../../shared/components/userInputPassword'));
const ModerateButton = lazy(() => import('../../shared/components/moderateButton'));
const UserInputConformPassword = lazy(() => import('../../shared/components/userInputConformPassword'));


export default function ResetPassword() {
  
  const { forgotEmail, userOtp , loading ,forgotPasswordUser } = useSelector(state => state.auth);

  const navigate = useNavigate();
  
  const dispatch = useDispatch();

  // update  forgot password state :)
  const handleChange = (e) => {
    const { name, value }  = e.target;
    dispatch(setForgotPasswordData({name,value}));
  };

  // check forgot password is valid or not :)
  const checkForgotPassword = (forgotPasswordUser) => {
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    let isValid = false;
    if ((forgotPasswordUser.resetPassword === "") || (forgotPasswordUser.resetPassword.length === 0)) {
      toast.error('Please enter password');
      return isValid;
    }
    else if (forgotPasswordUser.resetPassword.length <= 7) {
      toast.error('Please enter more then 7 character');
      return isValid;
    }
    else if (!password_pattern.test(forgotPasswordUser.resetPassword)) {
      toast.error('Please enter a valid password');
      return isValid;
    }
    else if (forgotPasswordUser.resetPassword !== forgotPasswordUser.reserConfromPassword) {
      toast.error('Please enter same password');
      return isValid;
    }
    isValid = true;
    return isValid;
  }
  
  // submit forgot password Data :)
  const handleClick = (e) => {
    const email_pattern = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if ((forgotEmail === "") || (forgotEmail === 0) || (!email_pattern.test(forgotEmail))) {
      toast.error('Please enter a valid email');
      navigate('/forgotPassword');
      // localStorage.removeItem('forgotPassEmail');
      // localStorage.removeItem('forgotPassOtp');
      return;
    }
   
    if (checkForgotPassword(forgotPasswordUser)) {
      const data = {
        email: forgotEmail,
        password:  forgotPasswordUser.resetPassword,
        otp: userOtp,
      }
      dispatch(forgorPassword(data))
      .then((res) => {
        if (res.payload.msg === 'forget password successfully') {
          console.log('response : ############### ', res.payload)
          navigate('/login');
        }
      })
      .catch((err) => {
        console.log("error :-- login catch --", err);
      })
    }
  }

  return (
    <>
      <div>
        <div className="mainResetPassword">
          <div className="vectorTop"></div>
          <div className="vectorBottom"></div>
          <div className="container">
            <div className="innerResetPassword">
              <div className="imagePart">
                <img src={AuthDesktop} alt="authDesktopImage" className='auth' loading='lazy' />
                <img src={authResetPassword} alt="auth-resetPassword" className='auth-resetPassword' loading='lazy' />
              </div>
              <div className="resetPasswordPart">
                <div className="verificationForm">
                  <div className="resetPasswordHeadingPart">
                    <p className='resetPasswordHeading'>Reset password</p>
                    <p className='resetPasswordHeadingDescription'>Create your new password for tassy so you can login to your account</p>
                  </div>
                  <div className="resetPasswordUserPassword">
                    <p className='resetPasswoedUserEmailHeading'>Create password</p>
                    <UserInputPassword name="resetPassword" placeholder="Create password" onChange={(e) => handleChange(e)} value={forgotPasswordUser.resetPassword} />
                  </div>
                  <div className="resetPasswordUserPassword">
                    <p className='resetPasswoedUserEmailHeading'>Confirm password</p>
                    <UserInputConformPassword name="reserConfromPassword" placeholder="Confirm password" onChange={(e) => handleChange(e)} value={forgotPasswordUser.reserConfromPassword} />
                  </div>
                  <ModerateButton text="Continue" onClick={(e) => handleClick(e)} disabled={loading === 'pending' ? true : false}  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
