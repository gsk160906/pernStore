import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios"
import ThemeSelector from "../components/ThemeSelector"

function Register() {
    const [loading, setLoading] = useState(false);
    const [values,setValues] = useState({
        username: '',
        email:'',
        password:''
    })

    const navigate = useNavigate();

   const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    try {
        const res = await axios.post(
            "http://localhost:3000/api/auth/register",
            values
        );

        if (res.data.success) {
            setValues({
            username: "",
            email: "",
            password: "",
            });
            navigate("/login");
        }
    } catch (err) {
        console.log(err);
    console.log(err.response?.data);
    alert(err.response?.data?.message || "Registration failed");
    } finally{
        setLoading(false)
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 relative">
      
      {/* Theme Selector */}
      <div className="absolute top-4 right-4">
        <ThemeSelector />
      </div>

      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">
            Create Account
          </h1>

          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Name</span>
              </label>

              <input
                type="text"
                placeholder="Enter Name"
                value={values.username}
                onChange={(e) =>
                  setValues({ ...values, username: e.target.value })
                }
                className="input input-bordered w-full"
                autoComplete="off"
              />
            </div>

            <div className="form-control mb-4">
              <label className="label">
                <span className="label-text">Email</span>
              </label>

              <input
                type="email"
                placeholder="Enter Email"
                value={values.email}
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
                className="input input-bordered w-full"
                autoComplete="off"
              />
            </div>

            <div className="form-control mb-6">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                type="password"
                placeholder="Enter Password"
                value={values.password}
                onChange={(e) =>
                  setValues({ ...values, password: e.target.value })
                }
                className="input input-bordered w-full"
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={loading}>
              {loading ? (
                    <span className="loading loading-spinner loading-sm"></span>
                ) : (
                    "Sign Up"
                )}
            </button>

            <p className="text-center text-sm mt-4">
              Already have an account?
            </p>

            <Link to="/login" className="btn btn-outline w-full mt-2">
              Login
            </Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register;