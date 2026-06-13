import { Link, useResolvedPath,useNavigate} from "react-router-dom";
import { useState } from "react";
import {ShoppingCartIcon,ShoppingBagIcon,LogOutIcon} from "lucide-react"
import ThemeSelector from "./ThemeSelector";
import { useThemeStore } from "../store/useThemeStore";
import { useProductStore } from "../store/useProductStore";
import axios from "axios";
import { API_URL } from "../lib/api";



function Navbar() {
    const { pathname } = useResolvedPath();
    const isHomePage = pathname === "/";
    const [loading, setLoading] = useState(false);

    const {products} = useProductStore();
    const navigate = useNavigate();

    
    const handleLogout = async()=>{
        try {
            setLoading(true);

            const res = await axios.get(
            `${API_URL}/api/auth/logout`,
            { withCredentials: true }
            );

            if (res.data.success) {
            navigate("/login");
            }
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
      }

  return (
    <div className='bg-base-100/80 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto'>
            <div className='navbar px-4 min-h-[4rem] justify-between'>
                {/* LOGO */}
                <div className="flex-1 lg:flex-none">
                    <Link to="/" className="hover:opacity-80 transition-opacity">
                    <div className="flex items-center gap-4">
                        <ShoppingCartIcon className="size-9 text-primary" />
                        <span
                        className="font-semibold font-mono tracking-widest text-2xl 
                            bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
                        >
                        POSTGRESTORE
                        </span>
                        <button
                        onClick={handleLogout}
                        className="btn btn-sm btn-outline btn-error"
                        disabled={loading}
                        >
                        {loading ? (
                            <span className="loading loading-spinner loading-xs"></span>
                        ) : (
                            <>
                            <LogOutIcon className="size-4" />
                            Logout
                            </>
                        )}
                        </button>
                    </div>
                    </Link>
                </div>

                {/*Right Section*/}
                <div className='flex items-center gap-4'>
                    
                    <ThemeSelector/>
                    
                    {isHomePage && (
                        <div className="indicator">
                            <div className="p-2 rounded-full hover:bg-base-200 transition-colors">
                                <ShoppingBagIcon className="size-5" />
                                    <span className="badge badge-sm badge-primary indicator-item">{products.length}</span>
                            </div>
                        </div>    
                    )}
                </div>

            </div>
        </div>
    </div>
  )
}

export default Navbar;