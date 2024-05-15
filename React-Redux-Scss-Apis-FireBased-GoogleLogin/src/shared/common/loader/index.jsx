import React from 'react';
import './loader.scss';
import SpinnerLoader from '../../components/spinnerLoader';


export default function Loader() {
  return (
    <div className='mainLoader'>
        <div className="container">
            <div className="innerLoader">
                <SpinnerLoader/>
            </div>
      </div>
    </div>
  )
}
