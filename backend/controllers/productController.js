import {sql} from "../config/db.js";




export const getAllProducts = async (req,res)=>{
    try {
        const userId = req.user.id;
        const products = await sql `SELECT * FROM products WHERE user_id=${userId} ORDER BY created_at DESC`;
        console.log("Fetched Products",products);
        res.status(200).json({success:true,data:products,name:req.username});
        
    } catch (error) {
        console.log("Error getProducts",error);
        res.status(500).json({success:false,message:"Internet Server Error"});
    }
};


export const getProduct = async(req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    try {   
        const product  = await sql `SELECT * FROM products WHERE user_id=${userId} AND id=${id}`;
        if(product.length == 0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });  
        }
        console.log("Fetched Product",product);
        res.status(200).json({success:true,data:product[0]});
    } catch (error) {
        console.log("Error in getProduct function", error);
        res.status(500).json({success:false,message:"Internal Server Error"});
    }
};




export const createProduct = async (req,res) =>{
    const {name,price,image} = req.body;
    const userId = req.user.id;
    
    if(!name || !price || !image){
        return res.status(400).json({success:false,message:"All fields are required"});
    }
    try { 
        const newProduct = await sql `INSERT INTO products (name,price,image,user_id) VALUES (${name},${price},${image},${userId}) RETURNING *`;
        console.log("new product added", newProduct);
        res.status(201).json({success:true,data:newProduct[0]});
    } catch (error) {
        console.log("Error in creating product",error);
        res.status(500).json({success:false,message:"Internet Server Error"});
    }
};



export const updateProduct = async (req,res)=>{
    const {id} = req.params;
    const {name,price,image} = req.body;
    const userId = req.user.id;
    try {
        const updatedProduct = await sql `UPDATE products SET name=${name},price=${price},image=${image} WHERE user_id=${userId} AND id=${id} RETURNING *`;
        if(updatedProduct.length == 0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });  
        }
        console.log("Fetching updated product",updatedProduct);
        res.status(200).json({success:true,data:updatedProduct[0]});
    } catch (error) {
        console.log("Error in updating product",error);
        res.status(500).json({success:false,message:"Internet Server Error"});
    }
};


export const deleteProduct = async (req,res)=>{
    const {id} = req.params;
    const userId = req.user.id;
    try {
        const deletedProduct = await sql `DELETE FROM products where user_id=${userId} AND id=${id} RETURNING *`;

        if(deletedProduct.length==0){
            return res.status(404).json({
                success:false,
                message:"Product not found",
            });
        }
        console.log("Fetching deleted product",deletedProduct);
        res.status(200).json({success:true,data:deletedProduct[0]});
    } catch (error) {
        console.log("Error in deleting product",error);
        res.status(500).json({success:false,message:"Internet Server Error"});
    }
};
