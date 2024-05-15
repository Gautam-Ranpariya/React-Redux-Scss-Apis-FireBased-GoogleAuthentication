import React  from 'react';
import './home.scss';
import logo from '../../assets/logo/logo.png';
import ModerateButton from '../../shared/components/moderateButton';
import ModerateOutlineButton from '../../shared/components/moderateOutlineButton';
import vectorTop from '../../assets/images/homeTopVector.png';
import vectorBottom from '../../assets/images/homeBottomVector.png';
import homeAuthentication from '../../assets/images/homeAuth.png';
import { useNavigate } from 'react-router-dom';


export default function Home() {

  const navigate = useNavigate();

  const handleClick = (param) => {
    navigate(`${param}`);
  }

  return (
    <>
      <div className='mainHome'>
        <div className="homeTopVector">
          <img src={vectorTop} alt="vector top" className='topVectorImageHome' loading='lazy' />
        </div>
        <div className="homeBottomVector">
          <img src={vectorBottom} alt="vector bottom" className='bottomVectorImageHome' loading='lazy' />
        </div>
        <div className="homeMobileTopVector"></div>
        <div className="homeMobilebottomVector"></div>
        <div className="innerHome">
          <div className="homeHeader">
            <div className="container">
              <div className="logo">
                <img  src={logo} alt="Online Shop" className='logoImage' loading='lazy' />
              </div>
              <div className="headerItems">
                <ModerateButton text="Login" onClick={() => handleClick('/login')} />
                <ModerateOutlineButton text="Sign up" onClick={() => handleClick('/signup')} />
              </div>
            </div>
          </div>
          <div className="homeMainContent">
            <div className="homeContentPart">
              <div className="innerContentPart">
                <h3 className='mainHomeHeading'>Unified Authentication</h3>
                <p className='homeHeadingDescription'>Welcome to our authentication project, offering seamless login experiences through Google authentication via Firebase, as well as social media authentication with Facebook and LinkedIn. Join us to simplify your login process and enhance user security.</p>
                <ModerateButton text="Get Started" onClick={() => handleClick('/login')} />
              </div>
            </div>
            <div className="homeImagePart">
              <div className="homeBannerImage">
              </div>
              <img src={homeAuthentication} alt="home - Authentication" className='homeShoppingGirl' loading='lazy' />
            </div>
            <div className="homeMobileContentPart">
              <h2 className='homeMobileHeading'>Welcome</h2>
              <p className='homeMobileHeadingDescription'>Ready to start Authenticate. login up to get Started.</p>
            </div>
            <div className="homeMobileImagePart">
              <div className="homeMobileBannerImage"></div>
              <img src={homeAuthentication} alt="home - Authentication" className='homeMobileShoppingGirl' loading='lazy' />
            </div>
            <div className="homeMobileAuthButtons">
              <ModerateButton text="Login" onClick={() => handleClick('/login')} />
              <ModerateOutlineButton text="Sign up" onClick={() => handleClick('/signup')}  />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
