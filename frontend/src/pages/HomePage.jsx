import React, { use, useEffect,useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { useProductStore } from '../store/useProductStore';
import {PlusCircleIcon,RefreshCwIcon,PackageIcon} from "lucide-react"; 
import axios from "axios";
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import AddProductModal from '../components/AddProductModal';
import { API_URL } from "../lib/api";

function HomePage() {
  const {products,loading,error,fetchProducts} = useProductStore();
  const [auth,setAuth] = useState(false);
  const [name,setName] = useState('');
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

   useEffect(()=>{
    axios.get(`${API_URL}/api/products`,{withCredentials:true})
        .then(res => {
          console.log("AUTH CHECK:", res.data);
            if(res.data.success){
                setAuth(true);
                console.log(res.data);
                setName(res.data.name);
            }
            else{
                navigate('/login');
            }
        })
        .catch((err) => {
          console.log("AUTH ERROR:", err.response?.status);
      console.log(err);
      navigate("/login");
    })
    .finally(()=>{
      setCheckingAuth(false);
    })
}, [navigate]);



 useEffect(() => {
    if (auth) {
      fetchProducts();
    }
  }, [auth, fetchProducts]);
  
  if (checkingAuth) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loading loading-spinner loading-lg"></div>
      </div>
    );
  }

  if (!auth) {
    return null;
  }


  return (
    <main className='max-w-6xl mx-auto px-4 py-8 overflow-x-hidden'>
      <Navbar />
      <div className="flex justify-between items-center mb-8">
        <button
          className="btn btn-primary"
          onClick={()=>document.getElementById("add_product_modal").showModal()}>
          <PlusCircleIcon className="size-5 mr-2" />
          Add Product
        </button>
        <button className="btn btn-ghost btn-circle" onClick={fetchProducts}>
          <RefreshCwIcon className="size-5" />
        </button>
      </div>

      <AddProductModal/>

       {error && <div className="alert alert-error mb-8">{error}</div>}

      {products.length === 0 && !loading && (
        <div className="flex flex-col justify-center items-center h-96 space-y-4">
          <div className="bg-base-100 rounded-full p-6">
            <PackageIcon className="size-12" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-semibold ">No products found</h3>
            <p className="text-gray-500 max-w-sm">
              Get started by adding your first product to the inventory
            </p>
          </div>
        </div>
      )}


       {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loading loading-spinner loading-lg" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  )
}

export default HomePage;