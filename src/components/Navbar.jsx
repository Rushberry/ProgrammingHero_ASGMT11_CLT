import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { HiMiniBars3BottomRight } from "react-icons/hi2";



const Navbar = () => {
    const navigate = useNavigate()
    const { user, signOutUser} = useContext(AuthContext)
    const handleSignOut = () => {
        signOutUser()
        navigate('/')
    }
    const navLinks = <>
        <div className="flex lg:flex-row flex-col gap-2 font-medium">
            <NavLink to="/" className="px-2 py-1.5 rounded-lg">Home</NavLink>
            <NavLink to="/availableCars" className="px-2 py-1.5 rounded-lg">Available Cars</NavLink>
            {
                user && <>
                    <NavLink to="/addCar" className="px-2 py-1.5 rounded-lg">Add Car</NavLink>
                    <NavLink to="/myCars" className="px-2 py-1.5 rounded-lg">My Cars</NavLink>
                    <NavLink to="/myBookings" className="px-2 py-1.5 rounded-lg">My Bookings</NavLink>
                </>
            }
        </div>
    </>
    return (
        <div className="bg-white border-b border-black flex flex-col">
            <nav className="py-2 px-3 flex flex-row justify-between items-center">
                {/* <img src="/assets/favicon.png" alt="Chill Gamer" className="w-[55px] mt-1" /> */}
                <h1 className="text-black text-2xl font-medium font-space">AURA DRIVE</h1>
                <div className="text-black lg:flex hidden">{navLinks}</div>
                {
                    user ?
                        <div id="auth" className="p-2 rounded-full py-1 hidden lg:flex flex-row justify-center items-center gap-2">
                            <button onClick={handleSignOut} className="py-1 my-1 font-medium px-3 bg-[#c24444] gap-2 text-[16px] rounded-full text-white">Log Out</button>
                            <Tooltip id="user-name-tooltip"></Tooltip>
                            <a className="cursor-pointer" data-tooltip-id="user-name-tooltip" data-tooltip-content={user?.displayName} data-tooltip-place="top" >
                                <img className="w-[55px]  rounded-full border border-black h-[55px] bg-cover bg-center" src={user.photoURL ? user.photoURL : 'https://i.ibb.co.com/xLp370Q/39f240a04441d36e63432f10f21ff951.jpg'} />
                            </a>
                        </div>

                        :
                        <div id="auth" className="rounded-full py-1 hidden lg:flex flex-row justify-start items-center ml-3 gap-2">
                            <NavLink to="/login" className="py-1 font-medium px-3 bg-white border border-black gap-2 text-[16px] rounded-full text-black">Login</NavLink>
                            <NavLink to="/register" className="py-1 font-medium px-3 bg-white border border-black gap-2 text-[16px] rounded-full text-black">Register</NavLink>
                        </div>

                }
                <div className="lg:hidden flex gap-4">
                    <div className="lg:hidden flex">
                        
                    </div>
                    <div className="dropdown lg:hidden flex flex-row gap-4">

                        <div tabIndex={0} role="button" className="w-10 h-10 bg-black rounded-full text-white border-white border flex justify-center items-center">
                            <HiMiniBars3BottomRight />
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content right-2   bg-black border border-white rounded-box z-[5] mt-[80px] w-[150px]  p-2 gap-[15px] flex flex-col items-start text-[16px] text-[#0B0B0BB3] font-medium justify-center">

                            <div className="text-white w-full " id="bars">{navLinks}</div>
                            {
                                user ?
                                    <div id="auth" className="p-2 rounded-full py-1 flex flex-col justify-start items-start gap-2">
                                        <button onClick={handleSignOut} className="py-1 my-1 font-medium px-3 bg-[#c24444] gap-2 text-[16px] rounded-full text-white">Log Out</button>
                                        <a className="cursor-pointer" data-tooltip-id="user-name-tooltip" data-tooltip-content={user?.displayName} data-tooltip-place="top" >
                                            <img className="w-[55px]  rounded-full border border-black h-[55px] bg-cover bg-center" src={user.photoURL ? user.photoURL : 'https://i.ibb.co.com/FWDPjz3/Anime-Boy-Smile-1.jpg'} />
                                        </a>
                                        <Tooltip id="user-name-tooltip"></Tooltip>
                                    </div>
                                    :
                                    <div id="bars" className="rounded-full py-1 flex flex-col justify-start items-start ml-3 gap-2">
                                        <NavLink to="/login" className="py-1 font-medium px-3 bg-black border border-white gap-2 text-[16px] rounded-full text-white">Login</NavLink>
                                        <NavLink to="/register" className="py-1 font-medium px-3 bg-black border border-white gap-2 text-[16px] rounded-full text-white">Register</NavLink>
                                    </div>
                            }

                        </ul>
                    </div>
                </div>
            </nav>
            <div className="bg-black h-1.5 blur-md"></div>
        </div>
    );
};

export default Navbar;