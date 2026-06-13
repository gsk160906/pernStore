import React, { use } from 'react'
import {Routes,Route} from "react-router-dom";
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import Register from "./pages/Register";
import Login from "./pages/Login";

import { useThemeStore } from './store/useThemeStore';
import { Toaster } from 'react-hot-toast';

function App() {
  const {theme} = useThemeStore();
  return (
    <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>
      

      <Routes>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App;
