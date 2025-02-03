import { IProduct } from "../interfaces/Product"

type State = {
    products: IProduct[]
}
type Action = 
| {
    type: "SET_PRODUCTS",
    payload: IProduct[]
} 
| { type : "ADD_PRODUCT"; payload: IProduct }
| { type : "UPDATE_PRODUCT"; payload: IProduct }
| { type : "DELETE_PRODUCT"; payload:  string | number}

const  productReducer = (state:State , action: Action) => {
    switch(action.type) {
        case "SET_PRODUCTS": 
        return {
            ...state, products: action.payload
        }
        case "ADD_PRODUCT": 
        return {
            ...state, 
            products: [...state.products, action.payload]
        }
        case "UPDATE_PRODUCT": 
        return {
            ...state, 
            products: state.products.map(product => (product._id === action.payload._id ? action.payload : product))
        }
        case "DELETE_PRODUCT": 
        return {
            ...state, 
            products: state.products.filter((product) => product._id !== action.payload )
        }
        default: 
        return state;
    }
}

export default productReducer