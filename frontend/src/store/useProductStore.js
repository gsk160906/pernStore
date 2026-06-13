import {create} from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

//base url will be dynamic
const BASE_URL = import.meta.env.MODE==="development" ? "http://localhost:3000":"";

export const useProductStore = create((set,get)=>({
    //product state
    products: [],
    loading: false,
    error:null,
    currentProduct: null,

    //form state
    formData : {
        name:"",
        price:"",
        image:"",
    },

    setFormData: (formData)=> set({formData}),
    resetForm:()=> set({formData: {name:"",price:"",image:"",}}),


    addProduct:async(e)=>{
        e.preventDefault();
        set({loading:true});

        try {
            const {formData} = get();
            await axios.post(`${BASE_URL}/api/products`,formData,{withCredentials:true});
            await get().fetchProducts();
            get().resetForm();
            toast.success("product added");
            document.getElementById("add_product_modal").close();
        } catch (error) {
            console.error("error in adding product");
            toast.error("Something went wrong");
        }finally{
            set({loading:false});
        }
    },

    fetchProducts: async()=>{
        set({loading:true});
        try { 
            const response = await axios.get(`${BASE_URL}/api/products`,{withCredentials:true})
            set({products:response.data.data,error:null});
        } catch (err) {
            if(err.status == 429) set({error:"Rate Limit Exceeded",products:[]});
            else set({error:"Something went wrong",products:[]});
        } finally{
            set({loading:false});
        }
    },

    deleteProduct : async(id)=>{
        set({loading:true});
        try{
        await axios.delete(`${BASE_URL}/api/products/${id}`,{withCredentials:true});
        set(prev => ({products: prev.products.filter((product) => product.id !== id)}))
        toast.success("Product deleted successfully");
        }
        catch(err){
            console.log("error in deleteProduct",err);
            toast.error("Something went wrong");
        }
        finally{
            set({loading:false});
        }
    },

    fetchProduct: async(id)=>{
        set({loading:true});
        try {
            const  response = await axios.get(`${BASE_URL}/api/products/${id}`,{withCredentials:true});
            set ({currentProduct:response.data.data,
                formData: response.data.data,
                error:null,
            });
            
        } catch (error) {
            console.log("Error in fetchProduct",error);
        } finally{
            set({loading:false});
        }
    },


    updateProduct: async(id)=>{
        set({loading:true});
        try {
            const {formData}= get();
            const response = await axios.put(`${BASE_URL}/api/products/${id}`,formData,{withCredentials:true});         
            set({currentProduct: response.data.data});
            toast.success("product epdated successfully");
        }catch(error){
            console.log("error in updating product",error);
            set({error:"something went wrong",currentProduct:null});
        } finally{
            set({loading:false});
        }
    },

}))