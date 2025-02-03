import { StyleProvider } from '@ant-design/cssinjs'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import App from './App.tsx'
import { CategoryProvider } from './contexts/CategoryContext.tsx'
import { ProductProvider } from './contexts/ProductContext.tsx'
import './index.scss'
import { AuthProvider } from './contexts/AuthContext.tsx'

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyleProvider layer>
          <AuthProvider>
          <ProductProvider>
            <CategoryProvider>
              <App />
            </CategoryProvider>
          </ProductProvider>
          </AuthProvider>
        </StyleProvider>
        </BrowserRouter>
      </QueryClientProvider>
  </React.StrictMode>,
)
