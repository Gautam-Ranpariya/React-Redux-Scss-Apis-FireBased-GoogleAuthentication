import React, { lazy } from 'react'
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, loginUserData, setAuthenticateUser, setGoogleAuthData } from '../../redux/apiSclices/authSclice';
import { toast } from 'react-toastify';
import AuthDesktop from '../../assets/images/authDesktop.png';
import facebookIcon from '../../assets/icons/facebook.svg';
import googleIcon from '../../assets/icons/google.svg';
import githubIcon from '../../assets/icons/github.svg';
import authLogin from '../../assets/images/auth-login.png';
import ValidateUserLogin from '../../validation/loginValidation';
import SetCookie from '../../helpers/cookies/setCookie';
import RemoveCookie from '../../helpers/cookies/removeCookie';
import { FacebookAuthProvider, getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../../../firebaseConfig';

const UserInputEmail = lazy(() => import('../../shared/components/userInputEmail'));
const UserInputPassword = lazy(() => import('../../shared/components/userInputPassword'));
const ModerateButton = lazy(() => import('../../shared/components/moderateButton'));
const SocialMediaButton = lazy(() => import('../../shared/components/socialMediaButton'));


export default function Login() {

  const { loading, user } = useSelector(state => state.auth);

  const navigate = useNavigate();

  const dispatch = useDispatch();


  // google login :)
  const handleGoogleLogin = async () => {
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((res) => {
        const displayName = res?.user?.displayName;
        const email = res?.user?.email;
        const photo = res?.user?.photoURL;
        const token = res?.user?.accessToken;
        RemoveCookie('accessToken');
        SetCookie('accessToken', token);
        dispatch(setGoogleAuthData({ displayName, email, photo }));
        dispatch(setAuthenticateUser(token ? true : false));
        navigate('/profile');
      })
    } catch (error) {
      console.log('Google login failed', error);
    }
  }


  // facebook login :)
  const handleFacebbokLogin = async () => {
    const auth = getAuth(app);
    const provider = new FacebookAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((res) => {
        const displayName = res?.user?.displayName;
        const email = res?.user?.email;
        const photo = res?.user?.photoURL;
        const token = res?.user?.accessToken;
        RemoveCookie('accessToken');
        SetCookie('accessToken', token);
        dispatch(setGoogleAuthData({ displayName, email, photo }));
        dispatch(setAuthenticateUser(token ? true : false));
        navigate('/profile');
        toast.success(`Welcome ${displayName}, Your Successfully logged in. !!`);
      })
    } catch (error) {
      console.log('Facebook login failed', error);
    }
  }


  // github login :)
  const handleGitHubLogin = async () => {
    const auth = getAuth(app);
    const provider = new GithubAuthProvider();
    try {
      await signInWithPopup(auth, provider).then((res) => {
        const displayName = res?.user?.displayName;
        const email = res?.user?.email;
        const photo = res?.user?.photoURL;
        const token = res?.user?.accessToken;
        RemoveCookie('accessToken');
        SetCookie('accessToken', token);
        dispatch(setGoogleAuthData({ displayName, email, photo }));
        dispatch(setAuthenticateUser(token ? true : false));
        navigate('/profile');
        toast.success(`Welcome ${displayName}, Your Successfully logged in. !!`);
      })
    } catch (error) {
      console.log('GitHub login failed', error);
    }
  }



  // submit login form :)
  const handleClick = async (e) => {
    if (ValidateUserLogin(user)) {
      await dispatch(loginUser(user))
        .then((res) => {
        const token = res?.payload?.token;
        const email =  user?.email;
          if (token) {
            RemoveCookie('accessToken');
            SetCookie('accessToken', token);
            dispatch(setAuthenticateUser(token ? true : false));
            navigate('/profile');
            toast.success(`Welcome ${email}, Your Successfully logged in. !!`);
          }
          else if (res?.payload?.response?.data?.msg === 'wrong password') {
            toast.error("Please Enter Valid Password");
          }
          else if (res?.payload?.response?.data?.msg === 'you dont have a account plz sing up') {
            toast.error("you dont have a account plz sing up");
          }
          else {
            console.log('error: ', res?.payload);
            navigate('/signup');
          }
        })
        .catch((err) => {
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
                    <SocialMediaButton img={facebookIcon} alt="facebook Icon" onClick={handleFacebbokLogin} className="icons" />
                    <SocialMediaButton img={googleIcon} alt="google Icon" onClick={handleGoogleLogin} className="icons" />
                    <SocialMediaButton img={githubIcon} alt="github Icon" onClick={handleGitHubLogin} className="github icons" />
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
