import { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../interfaces/Category";
import { IProduct } from "../interfaces/Product";
import productReducer from "../reducers/productReducer";
import categoryReducer from "../reducers/categoryReducer";
import instance from "../apis";

type CategoryContextType = {
    state : { categories: ICategory[],}
    handleRemoveCate: (id: string) => void,
    handleAddCategory: (category: ICategory) => void,
    handleEditCategory: (category: ICategory) => void,
}
export const CategoryContext = createContext({} as CategoryContextType)

export const  CategoryProvider = ({ children } : {children: React.ReactNode}) => {
    const nav = useNavigate();
    const [state, dispatch] = useReducer(categoryReducer, { categories : []})
    
      useEffect(() => {
        (async () => {
            const { data } = await instance.get(`/categories`)
            dispatch({ type: 'SET_CATEGORIES', payload: data?.data})
        })()
      }, []);
      const handleRemoveCate = async (id: string) => {
        try {
            await instance.delete(`/categories/${id}`);
            dispatch({ type: 'DELETE_CATEGORY', payload: id });
        } catch (error) {
            console.error('Failed to delete product', error);
        }
    };

    const handleAddCategory = async (category: IProduct) => {
      try {
        const response = await instance.post("/categories/", category);
        dispatch({ type: 'ADD_CATEGORY', payload: response.data });
        nav("/admin/category");
      } catch (error) {
        console.log(error)
      }
    };
  
    const handleEditCategory = async (category: IProduct) => {
        try {
        const response = await instance.patch(`/categories/${category._id}`, category);
        dispatch({ type: 'UPDATE_CATEGORY', payload: response.data });
        nav("/admin/category");
      } catch (error) {
        console.log(error)
      }
    };
      
      
    return (
        <CategoryContext.Provider value={{state, handleRemoveCate , handleAddCategory, handleEditCategory}}>
            {children}
        </CategoryContext.Provider>
    )
}