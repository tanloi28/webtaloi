import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import instance from "../apis";

type ProductContextType = {
    state : { products: IProduct[],}
    handleRemove: (id: string) => void,
    handleAddProduct: (product: IProduct) => void,
    handleEditProduct: (product: IProduct) => void,
}
export const ProductContext = createContext({} as ProductContextType)

export const  ProductProvider = ({ children } : {children: React.ReactNode}) => {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(productReducer, { products : []})
    
      useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/products`)
            dispatch({ type: 'SET_PRODUCTS', payload: data?.data})
        })()
      }, []);
      const handleRemove = async (id: string) => {
        try {
            await instance.delete(`/products/${id}`);
            dispatch({ type: 'DELETE_PRODUCT', payload: id });
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleAddProduct = async (product: IProduct) => {
      try {
        const response = await instance.post("/products/", product);
        dispatch({ type: 'ADD_PRODUCT', payload: response.data });
        nav("/admin/product");
      } catch (error) {
        console.log(error)
      }
    };
  
    const handleEditProduct = async (product: IProduct) => {
      try {
        if (!product._id) {
          throw new Error("Product ID is required for editing");
        }
        const response = await instance.patch(`/products/${product._id}`, product);
        dispatch({ type: 'UPDATE_PRODUCT', payload: response.data });
        nav("/admin/product");
      } catch (error) {
        console.log(error)
      }
    };
      
      
    return (
        <ProductContext.Provider value={{state, handleRemove , handleAddProduct, handleEditProduct}}>
            {children}
        </ProductContext.Provider>
    )
}