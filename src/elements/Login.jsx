import { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { setEmail, setUser, loginUser, signInWithGoogle } = useContext(AuthContext)
    const [error, setError] = useState(null)
    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()
    const showPassword = () => {
        setShowPass(!showPass)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleLogin = (e) => {
        e.preventDefault()
        setError(null)
        const email = e.target.email.value;
        const password = e.target.password.value;
        loginUser(email, password)
            .then(result => {
                setUser(result.user)
                e.target.reset()
                toast.success('Login Successful!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(location?.state ? location?.state : "/")
                }, 2050)
                
            })
            .catch(err => {
                // //console.log(err)
                setError(err.message)
            })
    }
    const handleSignInWithGoogle = () => {
        setError(null)
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                // //console.log(result)
                toast.success('Login Successful!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate(location?.state ? location?.state : "/")
                }, 2050)
            })
            .catch(err => {
                setError(err.message)
            })
    }
    return (
        <div className="py-[80px] bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <ToastContainer></ToastContainer>
            <div className="w-full bg-transparent backdrop-blur-md border border-white rounded-3xl mt-12 mx-4 md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-space font-bold leading-tight tracking-tight text-white md:text-2xl">
                        Login to your account
                    </h1>
                    <button onClick={handleSignInWithGoogle} className="bg-gray-50 border flex-row border-gray-300 text-gray-800 rounded-lg  flex justify-center items-center w-full p-2 hover:bg-[#f2f3f5] transition-all">
                        <img className="w-[30px]" src="https://i.ibb.co.com/HD31pwT/Google-Icons-09-512.webp" alt="Google" /> Log in with Google
                    </button>
                    <div className="flex flex-row justify-center items-center rounded-full ">
                        <span className="border-t border-white w-full"></span>
                        <span className=" px-3 text-white text-[20px] font-space">OR</span>
                        <span className="border-t border-white w-full"></span>
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Email Address</label>
                            <input type="email" onChange={handleEmailChange} name="email" id="email" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email" required />
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            <div className="absolute right-4 top-10 cursor-pointer" onClick={showPassword}>{showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
                        </div>
                        <p className="text-red-500">
                            {error}
                        </p>
                        <button type="submit" className="w-full text-white bg-black transition-all hover:bg-white hover:text-black border border-white font-semibold rounded-lg text-lg px-5 py-2.5 text-center">Login</button>
                        <p className="text-sm font-light text-gray-500">
                            Don’t have an account yet? <Link to="/register" className="font-medium text-primary-600 hover:underline">Register</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;