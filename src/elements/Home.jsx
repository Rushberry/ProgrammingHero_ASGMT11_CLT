import axios from 'axios';
import ReactStars from "react-rating-stars-component";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { BsFillMouseFill } from 'react-icons/bs';
import scrollAnimation from '../scrollDown.json'
import { IoMdBookmark, IoMdPricetag } from 'react-icons/io';
import { IoCarSport, IoWallet } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
import Lottie from 'lottie-react';
import Marquee from 'react-fast-marquee';
import { GoArrowUpRight } from 'react-icons/go';
const Home = () => {
    const [cars, setCars] = useState([])
    useEffect(() => {
        axios.get('https://aura-drive.vercel.app/latestSix')
            .then(res => setCars(res.data))
    }, [])
    return (
        <div>
            <div className="bg-[url('/assets/goldenCar.png')] w-full h-screen bg-no-repeat bg-cover bg-center">
                <div className="bg-black inset-0 bg-opacity-30 w-full h-full">
                    <div className='flex lg:gap-7 md:gap-5 gap-4 flex-col justify-center items-center w-full h-full'>
                        <h1 className={`-mb-5 text-2xl font-space text-white `}>
                            <Typewriter
                                words={['Drive Your Dreams Today!', 'Your Next Car Awaits You.']}
                                loop={true}
                                cursor
                                cursorStyle="_"
                                typeSpeed={70}
                                deleteSpeed={50}
                                delaySpeed={1000}
                            />
                        </h1>
                        <h1 className="text-transparent -mb-2 text-stroke-white font-extrabold w-11/12 text-[42px] lg:text-center">
                            Explore Luxury and Comfort with Aura Drive
                        </h1>
                        <Link to={`/availableCars`} className='text-white bg-black hover:bg-white hover:text-black transition-all border border-white font-semibold rounded-lg lg:text-lg text-sm px-3 py-2 text-center'>View Available Cars</Link>
                        <div className='flex justify-center items-center'>
                            <Lottie animationData={scrollAnimation} loop={true}></Lottie>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col justify-center items-center py-12">
                <h2 className='font-space text-[28px] text-black font-medium'>Why Choose Us?</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center w-11/12 mt-3">
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#c79520] to-[#fcc200] rounded-lg p-6'>
                        <IoCarSport className='text-black text-5xl' />
                        <h3 className='text-black font-semibold font-space text-lg'>Wide Variety of Cars</h3>
                        <p className="text-white">Choose from economy to luxury, tailored to your needs.</p>
                    </div>
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#28A745] to-[#5FD88B] rounded-lg p-6'>
                        <IoWallet className='text-black text-5xl' />
                        <h3 className='text-black font-semibold font-space text-lg'>Affordable Prices</h3>
                        <p className="text-white">Competitive daily rates you can count on.</p>
                    </div>
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#007BFF] to-[#66B3FF] rounded-lg p-6'>
                        <BsFillMouseFill className='text-black text-5xl' />
                        <h3 className='text-black font-semibold font-space text-lg'>Easy Booking Process</h3>
                        <p className="text-white">Seamlessly book your ride in just a few clicks.</p>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col justify-center items-center pt-3 pb-12">
                <h2 className='font-space text-[28px] text-black font-medium'>Recent Listings</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center w-11/12 mt-3">
                    {
                        cars.map(car => (
                            <motion.div whileHover={{ scale: 1.05, boxShadow: '0 8px 15px rgba(0, 0, 0, 0.2)', }} transition={{ duration: 0.3, type: 'spring', }} key={car._id} className="gap-4 cursor-pointer rounded-xl justify-start items-center flex h-full flex-col p-3 w-full border border-black" >
                                <img src={car.imageUrl} alt={car.carModel} className="h-full rounded-xl lg:w-[320px] w-full" />
                                <div className="flex flex-col gap-2 w-full">
                                    <h1 className="font-space text-black flex flex-col-reverse gap-2 font-semibold text-xl">{car.carModel}
                                        <p>
                                            {
                                                car?.availability ? <p className='text-green-800 font-space text-sm font-medium bg-green-300 rounded-full px-2 w-fit'>Available</p> : <p className='w-fit text-red-800 font-space text-sm font-medium bg-red-300 rounded-full px-2'>Unavailable</p>
                                            }
                                        </p>
                                    </h1>
                                    <div className="flex flex-row gap-2">
                                        <div className="flex flex-row items-center text-black gap-1">
                                            <IoMdBookmark /> Booking count: {car.bookingCount}
                                        </div>
                                        <div className="flex flex-row items-center text-black gap-1">
                                            <IoMdPricetag /> ${car.dailyRentalPrice}/day
                                        </div>
                                    </div>
                                    <p className="text-[#9f9f9f]">Added {moment(car?.submitDate).fromNow()}</p>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>
            </div>
            <div className="bg-white flex flex-col justify-center items-center pt-3 pb-12">
                <h2 className='font-space text-[28px] text-black font-medium'>What Our Customers Say</h2>
                <Marquee loop={0} onCycleComplete={() => null} pauseOnHover="true" className="grid lg:grid-cols-3 grid-cols-1 justify-center items-center w-11/12 mt-3">
                    {/* Marquee loop={0} onCycleComplete={() => null} pauseOnHover="true"  */}
                    <div className="gap-4 cursor-pointer rounded-xl justify-start items-center flex h-full flex-col p-5 lg:w-[450px] w-[350px] mr-3 border bg-black" >
                        <p className="text-2xl text-white text-left flex justify-start w-full"><ReactStars count={5} value={5} edit={false} size={24} activeColor="#fffff"></ReactStars></p>
                        <p className='text-white text-xl font-space flex-grow'>"Alhamdulillah! The entire booking process was seamless, and the car was impeccably clean. It truly made our family weekend getaway special. I’m impressed by the professionalism and care of the service."</p>
                        <div className="flex justify-start items-center gap-2 w-full">
                            <img src="https://i.ibb.co.com/qJTKzKK/2.png" className='w-[50px] rounded-full' />
                            <div className="text-white">
                                <h6 className="font-medium">Omar Al-Fahad</h6>
                                <p className="font-light text-sm">CEO of Al-Fahad Corp</p>
                            </div>
                        </div>
                    </div>
                    <div className="gap-4 cursor-pointer rounded-xl justify-start items-center flex h-full flex-col p-5 lg:w-[450px] w-[350px] mr-3 border bg-black" >
                        <p className="text-2xl text-white text-left flex justify-start w-full"><ReactStars count={5} value={5} edit={false} size={24} activeColor="#fffff"></ReactStars></p>
                        <p className='text-white text-xl font-space flex-grow'>"Professionalism at its best! The service quality and vehicle options were remarkable. It’s clear that customer satisfaction is their top priority. This will definitely be my go-to car rental platform."</p>
                        <div className="flex justify-start items-center gap-2 w-full ">
                            <img src="https://i.ibb.co.com/V3MyBcd/3.png" className='w-[50px] rounded-full' />
                            <div className="text-white">
                                <h6 className="font-medium">Khalid Ibn Zayed</h6>
                                <p className="font-light text-sm">MD at Zayed Co.</p>
                            </div>
                        </div>
                    </div>
                    <div className="gap-4 cursor-pointer rounded-xl justify-start items-center flex h-full flex-col p-5 lg:w-[450px] w-[350px] mr-3 border bg-black" >
                        <p className="text-2xl text-white text-left flex justify-start w-full"><ReactStars count={5} value={5} edit={false} size={24} activeColor="#fffff"></ReactStars></p>
                        <p className='text-white text-xl font-space flex-grow'>"This service exceeded all my expectations! The car was delivered on time, spotless, and perfect for my corporate engagements. A reliable service that I can confidently recommend to anyone."</p>
                        <div className="flex justify-start items-center gap-2 w-full ">
                            <img src="https://i.ibb.co.com/bXLqQXk/1.png" className='w-[50px] rounded-full' />
                            <div className="text-white">
                                <h6 className="font-medium">Ahmed Al-Mansouri</h6>
                                <p className="font-light text-sm">Chairman of Mansouri Ltd.</p>
                            </div>
                        </div>
                    </div>
                    <div className="gap-4 cursor-pointer rounded-xl justify-start items-center flex h-full flex-col p-5 lg:w-[450px] w-[350px] mr-3 border bg-black" >
                        <p className="text-2xl text-white text-left flex justify-start w-full"><ReactStars count={5} value={5} edit={false} size={24} activeColor="#fffff"></ReactStars></p>
                        <p className='text-white text-xl font-space flex-grow'>"A flawless experience! From start to finish, the process was smooth and efficient. The vehicle’s quality and performance were top-notch, making my business trip even more productive. Exceptional service!"</p>
                        <div className="flex justify-start items-center gap-2 w-full ">
                            <img src="https://i.ibb.co.com/dKcy0Pw/4.png" className='w-[50px] rounded-full' />
                            <div className="text-white">
                                <h6 className="font-medium">Yusuf Al-Hakim</h6>
                                <p className="font-light text-sm">Senior Engineer at Hakim Tech</p>
                            </div>
                        </div>
                    </div>
                </Marquee>
            </div>
            <div className="bg-white flex flex-col justify-center items-center pt-3 pb-12">
                <h2 className='font-space text-[28px] text-[#a16c54] font-medium'>Special Offers</h2>
                <Marquee loop={0} onCycleComplete={() => null} pauseOnHover="true" direction='right' className="grid lg:grid-cols-3 grid-cols-1 justify-center items-center w-11/12 mt-3">
                    <div className="lg:w-[350px] w-[250px] mr-3 relative">
                        <img src="https://i.ibb.co.com/4mcH4bz/1.png" className="rounded-xl" />
                        <Link to={`/availableCars`} className=" border border-black text-white px-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium w-fit text-[18px] top-3 right-3 flex items-center absolute">Learn More<GoArrowUpRight /></Link>
                    </div>
                    <div className="lg:w-[350px] w-[250px] mr-3 relative">
                        <img src="https://i.ibb.co.com/jv4zW1Z/2.png" className="rounded-xl" />
                        <Link to={`/availableCars`} className=" border border-black text-white px-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium w-fit text-[18px] top-3 right-3 flex items-center absolute">Learn More<GoArrowUpRight /></Link>
                    </div>
                    <div className="lg:w-[350px] w-[250px] mr-3 relative">
                        <img src="https://i.ibb.co.com/zPjqjwD/3.png" className="rounded-xl" />
                        <Link to={`/availableCars`} className=" border border-black text-white px-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium w-fit text-[18px] top-3 right-3 flex items-center absolute">Learn More<GoArrowUpRight /></Link>
                    </div>
                </Marquee>
            </div>
        </div>
    );
};

export default Home;