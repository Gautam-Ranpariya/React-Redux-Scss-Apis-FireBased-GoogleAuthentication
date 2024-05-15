import React from 'react';
import './error.scss';
import pageNotFound from '../../assets/images/pageNotFound.png';

export default function Error() {
    return (
        <>
            <div className='mainError'>
                <div className="innerError">
                    <div className="errorContentPart">
                        <h3 className='errorStutasCode'>404</h3>
                        <h4 className='errorStutasText'>not found</h4>
                    </div>
                    <div className="errorImagePart">
                        <img src={pageNotFound} alt="Page not Found" className='pageNotFound' loading='lazy' />
                    </div>
                </div>
            </div>
        </>
    )
}
