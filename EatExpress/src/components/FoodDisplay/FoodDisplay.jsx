/* eslint-disable no-unused-vars */
import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

// eslint-disable-next-line react/prop-types
const FoodDisplay = ({ category }) => {

    const { food_list, addToCart } = useContext(StoreContext)

    return (
        <div className='food-display' id="food-display">
            <h2>Top dishes near you.</h2>
            <div className='food-display-list'>{food_list.map((item, index) => {
                //filter
                if (category === 'All' || category === item.category) {
                    return (<FoodItem key={index} id={item._id} name={item.name} description={item.description} image={item.image} price={item.price} />)

                }
            })}</div>
        </div>
    )
}

export default FoodDisplay