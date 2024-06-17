// eslint-disable-next-line no-unused-vars
import React from 'react'
import './AppDownload.css'
import { assets } from '../../assets/assets'

const AppDownload = () => {
    return (
        <div className='app-download' id='app-download'>
            <p>Get Food at your fingureTips. <br />Download <span className='app-download-app'>`Eats Express`</span> App</p>
            <div className='app-download-platforms'>
                <img src={assets.play_store} alt='' />
                <img src={assets.app_store} alt='' />
            </div>
        </div>
    )
}

export default AppDownload