import React, { lazy } from 'react'
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginUserData, resetUserData } from '../../redux/apiSclices/authSclice';
import { toast } from 'react-toastify';
import AuthDesktop from '../../assets/images/authDesktop.png';
import facebookIcon from '../../assets/icons/facebook.svg';
import googleIcon from '../../assets/icons/google.svg';
import linkedInIcon from '../../assets/icons/linkedIn.svg';
import authLogin from '../../assets/images/auth-login.png';
import ValidateUserLogin from '../../validation/loginValidation';
import SetCookie from '../../helpers/cookies/setCookie';
import RemoveCookie from '../../helpers/cookies/removeCookie';

const UserInputEmail = lazy(() => import('../../shared/components/userInputEmail'));
const UserInputPassword = lazy(() => import('../../shared/components/userInputPassword'));
const ModerateButton = lazy(() => import('../../shared/components/moderateButton'));
const SocialMediaButton = lazy(() => import('../../shared/components/socialMediaButton'));


export default function Login() {

  const { loading, user } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // google login :)
  // const login = useGoogleLogin({
  //   onSuccess: codeResponse => console.log(codeResponse),
  //   flow: 'auth-code',
  // });

  // const googleLogin = useGoogleLogin({
  //   flow: 'implicit',
  //   onSuccess: async (tokenResponse) => {
  //     try {
  //       console.log(tokenResponse)
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   },
  //   onError: (errorResponse) => console.log(errorResponse)
  // })


  // submit login form :)
  const handleClick = async (e) => {
    if (ValidateUserLogin(user)) {
      await dispatch(loginUser(user))
        .then((res) => {          
          if (res?.payload?.token) {
            RemoveCookie('accessToken');
            SetCookie('accessToken', JSON.stringify(res?.payload?.token));
            dispatch(resetUserData());
            navigate('/');
            toast.success(`Welcome ${user.email}, Your Successfully logged in. !!`);
          }
          else if (res?.payload?.response?.data?.msg === 'wrong password') {
            toast.error("Please Enter Valid Password");
          }
          else if (res?.payload?.response?.data?.msg === 'you dont have a account plz sing up') {
            toast.error("you dont have a account plz sing up");
          }
          else
          {
            console.log('error: ', res.payload);
            navigate('/signup');
          }
        })
        .catch((err) => {
          if (err) {
            navigate('/signup');
            toast.error('please sign up first');
          }
          console.log("error :-- login catch --", err);
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(loginUserData({ name, value }))
  }


  return (
    <>
      <div>
        <div className="mainLogin">
          <div className="vectorTop"></div>
          <div className="vectorBottom"></div>
          <div className="container">
            <div className="innerLogin">
              <div className="imagePart">
                <img src={AuthDesktop} alt="authDesktopImage" className='auth' loading='lazy' />
                <img src={authLogin} alt="auth-login" className='auth-login' loading='lazy' />
              </div>
              <div className="loginPart">
                <div className="loginForm">
                  <div className="loginHeadingPart">
                    <p className='loginHeading'>Login</p>
                    <p className='headingDescription'>Login to your account to continue</p>
                  </div>
                  <UserInputEmail name="email" placeholder="Enter Your Email" onChange={(e) => handleChange(e)} value={user.email} />
                  <UserInputPassword name="password" placeholder="Enter Your Password" onChange={(e) => handleChange(e)} value={user.password} />
                  <div className="forgotPasswordPart">
                    <p className='forgotPassword'>
                      <Link to={'/forgotPassword'} className='forgot'>Forgot password?</Link>
                    </p>
                  </div>
                  <ModerateButton text="Login" onClick={(e) => handleClick(e)} disabled={loading === 'pending' ? true : false} />
                  <div className="signInWithPart">
                    <div className='vector'></div>
                    <div className='otherOption'>
                      <p className='signInOption'>Or Sign In With</p>
                    </div>
                    <div className='vector'></div>
                  </div>
                  <div className='loginSocialMediaPart'>
                    <SocialMediaButton img={facebookIcon} alt="facebook Icon" />
                    <SocialMediaButton img={googleIcon} alt="google Icon" onClick={() => googleLogin()}  />
                    <SocialMediaButton img={linkedInIcon} alt="linkedIn Icon" />
                  </div>
                  <div className="signupOptionPart">
                    <p className='signupDescription'>Don`t have an account? <Link to={'/signup'} className='signupLink'>Sing up</Link></p>
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
