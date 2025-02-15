import React, { useState } from 'react';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';


const Register = () => {
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        aadhar: "",
        pan: ""
    });

    const allValue = Object.values(data).every(i => i);
    

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };
    
    async function handleSubmit(e){
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(data),
            })
            const {error, message, success} = await response.json();
            if(success){
                toast.success(message);
            }
            if(error){
                toast.error(message);
                return;
            }
            setData({
                name: "",
                number: "",
                email: "",
                password: "",
                aadhar: "",
                pan: ""
            })
            navigate("/");
        }
        catch (error) {
            toast.error("Network error! Please try again later.");
        }
    }

    return (
        <section className='mx-auto container w-full px-2'>
            <div className='bg-white my-1 w-full max-w-lg mx-auto rounded p-5'>
                <p className='font-bold text-center text-2xl mb-2'>Create Account</p>
                <img src={logo} alt="Logo" className='mx-auto' />
                <form onSubmit={handleSubmit} className='flex flex-col mt-2 gap-4'>
                    
                    {/* Name */}
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Name:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Name'
                            type="text"
                            name='name'
                            value={data.name}
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>

                    {/* Mobile */}
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Number:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Number'
                            type="text"
                            name='number'
                            value={data.number}
                            maxLength="10"
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>

                    {/* Email */}
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Email:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Email'
                            type="email"
                            name='email'
                            value={data.email}
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>

                    {/* Password */}
                    <div className='flex flex-col'>
                        <label className='text-2xl font-bold mb-2'>Password:</label>
                        <div className='bg-blue-50 p-4 border text-xl rounded-3xl flex items-center focus-within:border-primary-200'>
                            <input
                                onChange={handleChange}
                                placeholder='Enter Your Password'
                                type={showPassword ? "text" : "password"}
                                name='password'
                                value={data.password}
                                className='w-full outline-none'
                            />
                            <div className='cursor-pointer' onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <IoEye size={24}/> : <IoMdEyeOff size={24}/>}
                            </div>
                        </div>
                    </div>

                    {/* Aadhar Number */}
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Aadhar Number:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Aadhar Number'
                            type="text"
                            name='aadhar'
                            maxLength="12"
                            value={data.aadhar}
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>

                    {/* Pan Number */}
                    <div className='flex flex-col text-xl'>
                        <label className='text-2xl font-bold mb-2'>Pan Number:</label>
                        <input
                            onChange={handleChange}
                            placeholder='Enter Your Pan Number'
                            type="text"
                            name='pan'
                            value={data.pan}
                            maxLength="10"
                            className='bg-blue-50 p-4 border rounded-3xl outline-none focus:border-primary-200'
                        />
                    </div>

                    <button className={`${allValue ? "bg-green-800" : "bg-gray-600"} text-white py-5 rounded font-bold my-2`}>
                        Register
                    </button>
                </form>
                <p className='text-xl mt-1'>Already have an account? <Link className='font-semibold text-green-600' to='/'>Login</Link></p>
            </div>
            <ToastContainer />
        </section>
    );
};

export default Register;
