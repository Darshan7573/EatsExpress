import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img className='footer-content-img-logo' src={assets.logo} alt='' />
                    <p>Food Eats Express is a culinary adventure waiting to happen. Imagine a bustling marketplace, brimming with tantalizing aromas and vibrant colors, where every corner offers a new gastronomic delight. From savory street foods to gourmet delicacies, Food Eats Express brings together the best of global cuisine under one roof.</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} />
                        <img src={assets.twitter_icon} />
                        <img src={assets.linkedin_icon} />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About Us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91 6837687321</li>
                        <li>contact@eatsexpress.com</li>
                    </ul>
                </div>

            </div>
            <hr />
            <p className='footer-copyright'>Copyright @2024 Eats Express Inc., All Rights Reserved</p>
        </div>
    )
}

export default Footer