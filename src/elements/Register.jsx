import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const { setUser, updateUser, createUser, signInWithGoogle } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    const showPassword = () => {
        setShowPass(!showPass)
    }
    const handleRegister = (e) => {
        e.preventDefault()
        setError(null)
        const email = e.target.email.value;
        const password = e.target.password.value;
        const photo = e.target.photo.value;
        const name = e.target.name.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if (!passwordRegex.test(password)) {
            setError('Password must have at least 1 uppercase letter, 1 lowercase letter, and be at least 6 characters long.');
            //console.log(error)
            return;
        }
        createUser(email, password)
            .then(result => {
                setUser(result.user)
                updateUser({
                    displayName: name, photoURL: photo
                })
                    .then(() => {
                        // setUser({...user, displayName:name, photoURL:photo})
                        setUser((prev) => {
                            return { ...prev, displayName: name, photoURL: photo }
                        })
                        toast.success('Registered Successfully!', {
                            position: "top-right",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: false,
                            pauseOnHover: false,
                            theme: "light",
                        });
                        setTimeout(() => {
                            navigate('/')
                        }, 2050)
                    })
                    .catch((err) => setError(err.message))
                e.target.reset()
            })
            .catch(err => {
                setError(err.message)
            })
    }
    const handleSignInWithGoogle = () => {
        setError(null)
        signInWithGoogle()
            .then(result => {
                setUser(result.user)
                // //console.log(result)
                toast.success('Registered Successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                setTimeout(() => {
                    navigate('/')
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
                        Register your account
                    </h1>
                    <button onClick={handleSignInWithGoogle} className="bg-gray-50 border flex-row border-gray-300 text-gray-900 rounded-lg  flex justify-center items-center w-full p-2 hover:bg-[#f2f3f5] transition-all">
                        <img className="w-[30px]" src="https://i.ibb.co.com/HD31pwT/Google-Icons-09-512.webp" alt="Google" /> Register with Google
                    </button>
                    <div className="flex flex-row justify-center items-center rounded-full ">
                        <span className="border-t border-white w-full"></span>
                        <span className=" px-3 text-white text-[20px] font-space">OR</span>
                        <span className="border-t border-white w-full"></span>
                    </div>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Full Name</label>
                            <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your name" required />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Photo URL</label>
                            <input type="text" name="photo" id="photo" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your photo url" />
                        </div>
                        <div>
                            <label className="block mb-2 text-sm font-medium text-white">Email Address</label>
                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter your email" required />
                        </div>
                        <div className="relative">
                            <label className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type={showPass ? 'text' : 'password'} name="password" id="password" placeholder="Enter your password" className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                            <div className="absolute right-4 top-10 cursor-pointer" onClick={showPassword}>{showPass ? <FaEyeSlash size={20} /> : <FaEye size={20} />}</div>
                        </div>
                        {error && <p className="text-red-500">
                            {error}
                        </p>}
                        <button type="submit" className="w-full text-white bg-black hover:bg-white hover:text-black transition-all border border-white font-semibold rounded-lg text-lg px-5 py-2.5 text-center">Register</button>
                        <p className="text-sm font-light text-gray-500">
                            Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline">Login</Link>
                        </p>
                        
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;