import React, { useState } from 'react';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

const Login = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({ email: "", password: "" });
    const allValue = Object.values(data).every(i => i);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            });
    
            const result = await response.json();
    
            // Check if success is true
            if (result.success) {
                toast.success(result.message || "Login successful!");
    
                // Store accessToken only if it exists
                if (result.data?.accessToken) {
                    localStorage.setItem('accessToken', result.data.accessToken);
                } else {
                    toast.error("Access token missing from response!");
                    return;
                }
    
                // Reset form data
                setData({ email: "", password: "" });
    
                // Navigate after a short delay
                setTimeout(() => {
                    navigate("/home");
                }, 500);
    
            } else {
                toast.error(result.message || "Login failed. Please try again.");
            }
    
        } catch (error) {
            toast.error("Network error! Please check your connection.");
        }
    }
        
    return (
        <section className='mx-auto container w-full px-2'>
            <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7 '>
            <p className='font-bold text-center text-2xl mb-2'>Welcome To</p> <img src={logo} alt="" />
                <form onSubmit={handleSubmit} className='flex flex-col mt-8 gap-4'>
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Email:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            type="text"
                            name='email'
                            value={data.email}
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-2xl font-bold mb-2'>Password:</label>
                        <div className='bg-blue-50 p-4 border text-xl rounded-3xl flex items-center focus-within:border-primary-200'>
                            <input
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={data.password}
                                className='w-full outline-none '
                            />
                            <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEye size={24}/> : <IoMdEyeOff size={24}/>}
                            </div>
                        </div>
                        <Link className='block ml-auto hover:text-primary-100 mt-2 text-[16px]' to='/forgot-password'>Forgot Password?</Link>
                    </div>
                    <button className={`${allValue ? "bg-green-800" : "bg-gray-600"} text-white py-5 rounded font-bold my-2`}>
                        Login
                    </button>
                </form>
                <p className='text-xl mt-2'>Not have an account? <Link className='font-semibold text-green-600' to='/register'>Register</Link></p>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Login;
