/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const { cartItem, addToCart, food_list, removeFromCart, deleteFromCart, getTotalCartAmount, DelAmount, url } = useContext(StoreContext)

    const navigate = useNavigate()

    return (
        <div className='cart'>
            <div className='cart-items'>
                <div className='cart-items-title'>
                    <p>Items</p>
                    <p>Title</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p>Total</p>
                    <p>Remove</p>
                </div>
                <br />
                <hr />
                {food_list.map((item, index) => {
                    if (cartItem[item._id] > 0) {
                        return (
                            <div key={index}>
                                <div className='cart-items-title cart-items-item'>
                                    <img src={url + "/images/" + item.image} alt='' />
                                    <p>{item.name}</p>
                                    <p>₹ {item.price}</p>

                                    <p className='cart-item-item-quantity'><p className='cart-item-item-quantity-minus' onClick={() => removeFromCart(item._id)}> -</p><span>{cartItem[item._id]}</span> <p className='cart-item-item-quantity-plus' onClick={() => addToCart(item._id)}> + </p></p>
                                    <p>₹ {item.price * cartItem[item._id]}</p>

                                    <p onClick={() => deleteFromCart(item._id)} className='cross'><img src={assets.remove_icon_red} /></p>
                                </div>
                                <hr />
                            </div>

                        )
                    }
                })}
            </div>
            <div className='cart-bottom'>
                <div className='cart-total'>
                    <h2>Cart Totals</h2>
                    <div>
                        <div className='cart-total-details'>
                            <p>Subtotal</p>
                            <p>₹ {getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <p>Delivery Fee</p>
                            <p>₹ {DelAmount()}</p>
                        </div>
                        <hr />
                        <div className='cart-total-details'>
                            <b>Total</b>
                            <b>₹ {getTotalCartAmount() + DelAmount()}</b>
                        </div>
                    </div>
                    {getTotalCartAmount() === 0 ? '' :
                        <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>}
                </div>
                {getTotalCartAmount() === 0 ? '' :
                    <div className='cart-promocode'>
                        <div>
                            <p>Have a <span>promocode ?</span> Enter it here.</p>
                            <div className='cart-promocode-input'>
                                <input type='text' placeholder='Enter Promocode' />
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Cart