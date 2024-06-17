/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
// import { food_list } from "../assets/assets";
import axios from "axios";

export const StoreContext = createContext(null)

const StoreContextProvider = (props) => {

    const [cartItem, setCartItems] = useState({})
    const url = "http://localhost:8000"
    const [token, setToken] = useState('')
    const [food_list, setFooList] = useState([])

    //add  to Cart

    const addToCart = async (itemId) => {
        setCartItems((prev) => ({
            ...prev, [itemId]: (prev[itemId] || 0) + 1
        }))
        if (token) {
            await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
        }
    }

    //add to cart other way

    // const addToCart = async (itemId) => {
    //     if (!cartItem[itemId]) {
    //         setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    //     } else {
    //         setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    //     }
    //     if (token) {
    //         await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } })
    //     }
    // }



    const removeFromCart = async (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }
    }

    const deleteFromCart = async (itemId) => {
        setCartItems((prev) => {
            const updatedItems = { ...prev };
            delete updatedItems[itemId];
            return updatedItems;
        });
        if (token) {
            await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } })
        }

    };

    const getTotalCartAmount = () => {
        let totalAmount = 0
        for (const item in cartItem) {
            if (cartItem[item] > 0) {
                let itemInfo = food_list.find((product) => product._id === item)
                totalAmount += itemInfo.price * cartItem[item];
            }
        }
        return totalAmount
    }

    const DelAmount = () => {
        let delAmt = 0
        if (getTotalCartAmount() > 499) {
            delAmt = 0
        } else if (getTotalCartAmount() > 0 && getTotalCartAmount() < 499) {
            delAmt = 30
        } else if (getTotalCartAmount() === 0) {
            delAmt = 0
        }
        return delAmt;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list")
        setFooList(response.data.data)
    }

    const loadCartData = async (token) => {
        const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } })
        setCartItems(response.data.cartData)
    }


    useEffect(() => {
        async function loadDate() {
            await fetchFoodList()
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
                await loadCartData(localStorage.getItem("token"))
            }
        }
        loadDate()
    }, [])



    const contextValue = {
        food_list, cartItem, setCartItems, addToCart, removeFromCart, deleteFromCart, getTotalCartAmount, DelAmount, url, token, setToken
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider