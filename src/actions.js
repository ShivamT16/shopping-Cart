import productData from "./Data/test.json"
import { toast } from "react-toastify";

export const fetchProducts = () => async (dispatch) => {
    try {
        dispatch({type: "FECTH_DATA_LOADING"});
        dispatch({type: "FETCH_PRODUCT_SUCCESS" , payload: productData.data})
    } catch (error) {
        dispatch({type: "FETCH_PRODUCT_FAILURE"});
    }
}

export const addToCart = (product) => async (dispatch) => {
    try {
        dispatch({type: "ADD_TO_CART", payload: product})
    } catch (error) {
        dispatch({type: "ADD_TO-CART_FAILED"})
    }
}

export const removeFromCart = (productId) => async (dispatch) => {
    try {
        dispatch({type: "REMOVE_FROM_CART", payload: productId})
    } catch (error) {
        dispatch({type: "REMOVE_FROM_CART_FAILED"})
    }
}

export const increaseQuantity = (product) => async (dispatch) => {
    try {
        dispatch({type: "INCREASE_QUANTITY", payload: product})
    } catch (error) {
        dispatch({type: "ACTION_FAILED"})
    }
}

export const decreaseQuantity = (product) => async (dispatch) => {
    try {
        dispatch({type: "DECREASE_QUANTITY", payload: product})
    } catch (error) {
        dispatch({type: "ACTION_FAILED"})
    }
}

export const cartNotify = () => toast.success("Added to Cart");
export const deleteNotify = () => toast.success("Item removed");