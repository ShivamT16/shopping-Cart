const initialState = {
    products: [],
    cart: [],
    loading: false,
    error: null
}

export const shoppingReducer = (state = initialState, action) => {
    switch(action.type) {
        case "FECTH_DATA_LOADING":
            return{
                ...state,
                loading: true
            }
        case "FETCH_PRODUCT_SUCCESS":
            return{
                ...state,
                products: action.payload,
                loading: false,
                error: null
            }
        case "FETCH_PRODUCT_FAILURE":
            return{
                ...state,
                loading: false,
                error: "Error fetching products"
            }
        case "ADD_TO_CART":
            {
            const findProduct = state.cart.find((element) => element.id === action.payload.id);     
            if (findProduct) {
                    state.cart.map((cartItem) => {
                      if (cartItem.id === action.payload.id) {
                        return { ...state, cart: [...cartItem, {quantity: cartItem.quantity + 1}], loading: false, error: null};
                      } 
                      else {
                        return {...state, cart: [...cartItem],loading: false, error: null } ;
                      }
                    })} 
                  else {
                  return {...state, cart: [...state.cart, { ...action.payload, quantity: 1 }], loading: false, error: null } ;
                } };
            
        case "ADD_TO-CART_FAILED":
            return{
                ...state,
                loading: false,
                error: "Error adding product to your cart"
            }
        case "REMOVE_FROM_CART":
            return{
                ...state,
                cart: state.cart.filter((item) => item.id !== action.payload),
                loading: false,
                error: null
            }
        case "REMOVE_FROM_CART_FAILED":
            return{
                ...state,
                loading: false,
                error: "Error removing product from cart"
            }
        case "INCREASE_QUANTITY":
            return{ 
                ...state, 
                cart: [...state.cart].map((element) => element.id === action.payload.id
                ? { ...element, quantity: element.quantity + 1 }: element ),
                loading: false,
                error: null 
            };
        case "DECREASE_QUANTITY":
            return{ 
                ...state, 
                cart: [...state.cart].map((element) => element.id === action.payload.id
                ? { ...element, quantity: element.quantity - 1 } : element ),
                loading: false,
                error: null
            };
        case "ACTION_FAILED":
            return{
                ...state,
                loading: false,
                error: "Failsed requested action"
            }

       default: 
        return state;
    }
}