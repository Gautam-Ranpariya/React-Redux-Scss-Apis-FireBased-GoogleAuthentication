import React, { useEffect } from 'react';
import './profile.scss';
import profileAvtar from '../../assets/images/profileAvtar.png';
import profileErorImage from '../../assets/images/profileErrrorImage.png';
import { useDispatch, useSelector } from 'react-redux';
import RemoveCookie from '../../helpers/cookies/removeCookie';
import { resetUserData, setAuthenticateUser } from '../../redux/apiSclices/authSclice';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';


export default function Profile() {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = () => {
        RemoveCookie('accessToken');
        dispatch(setAuthenticateUser(false));
        dispatch(resetUserData());
        navigate('/login');
    }


    useEffect(() => {
        var count = 200;
        var defaults = {
            origin: { y: 0.7 }
        };

        function fire(particleRatio, opts) {
            confetti({
                ...defaults,
                ...opts,
                particleCount: Math.floor(count * particleRatio)
            });
        }

        fire(0.25, {
            spread: 26,
            startVelocity: 55,
        });
        fire(0.2, {
            spread: 60,
        });
        fire(0.35, {
            spread: 100,
            decay: 0.91,
            scalar: 0.8
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 25,
            decay: 0.92,
            scalar: 1.2
        });
        fire(0.1, {
            spread: 120,
            startVelocity: 45,
        });
    }, []);

    return (
        <>
            <div className='mainProfile'>
                <h2 className='profileHeading'>Unified <span className='authTextHeading'>Authentication</span></h2>
                <div className="container">
                    <div className="innerProfile">
                        <div className="profileMainContent">
                            <h3 className="profileSubHeading">
                                Your Profile
                            </h3>
                        </div>
                        <div className="profileImage">
                            <img src={user?.profileUrl ? user?.profileUrl : profileAvtar} alt="profile-Image" loading='lazy' className='profilePicture' onError={(e) => e.target.src = profileErorImage} />
                        </div>
                        <div className="userinformation">
                            <div className="userInfo">
                                <p className='userInfoSubHeading'>Name*</p>
                                <p className='userInfoDetail'>{user?.name ? user?.name : "John Deo"}</p>
                            </div>
                            <div className="userInfo">
                                <p className='userInfoSubHeading'>Email*</p>
                                <p className='userInfoDetail'>{user?.email ? user?.email : "johndeo@gmail.com"}</p>
                            </div>
                        </div>
                        <div className="saveProfile">
                            <button className='profileSaveButton' onClick={() => handleClick()}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
