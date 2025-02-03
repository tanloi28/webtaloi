import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import AuthForm from './components/AuthForm/AuthForm'
import LayoutAdmin from './components/Layout/LayoutAdmin/LayoutAdmin'
import LayoutClient from './components/Layout/LayoutClient/LayoutClient'
import AddCategory from './pages/admin/AddCategory'
import AddProduct from './pages/admin/AddProduct'
import EditCategory from './pages/admin/EditCategory'
import EditProduct from './pages/admin/EditProduct'
import ListCategory from './pages/admin/ListCategory'
import Order from './pages/admin/Order'
import Product from './pages/admin/Product'
import User from './pages/admin/User'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetail from './pages/ProductDetail'

function App() {
  
  return (
    <>
      <Routes>
        
        {/* client */}
        <Route path='/' element={<LayoutClient/>}>
          <Route index element={<Home />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path="/home" element={<Navigate to="/" />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/register' element={<AuthForm/>}/>
         <Route path='/login' element={<AuthForm isLogin/>}/>
        </Route>
        {/* admin */}
          <Route path='/admin' element={<LayoutAdmin/>}>
          <Route path='/admin' />
          {/* <Route path='/admin' /> */}
          <Route path='/admin/product' element={<Product  />} />
          <Route path='/admin/product-add' element={<AddProduct/>} />
          <Route path='/admin/product/edit/:id' element={<EditProduct/>}/>
          <Route path='/admin/category' element={<ListCategory />}/>
          <Route path='/admin/category-add' element={<AddCategory />}/>
          <Route path='/admin/category/edit/:id' element={<EditCategory />}/>
          <Route path='/admin/order' element={<Order/>}/>
          <Route path='/admin/users' element={<User/>}/>
          </Route>
        
      </Routes>
    </>
  )
}

export default App
