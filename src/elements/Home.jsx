import { BsFillMouseFill } from 'react-icons/bs';
import { IoCarSport, IoWallet } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter'
const Home = () => {
    return (
        <div>
            <div className="bg-[url('/assets/goldenCar.png')] w-full h-screen bg-no-repeat bg-cover bg-center">
                <div className="bg-black inset-0 bg-opacity-30 w-full h-full">
                    <div className='flex lg:gap-7 md:gap-5 gap-4 flex-col justify-center items-center w-full h-full'>
                        <h1 className={`lg:text-6xl md:text-4xl text-2xl font-space text-white `}>
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
                        <Link to={`/availableCars`} className='text-white bg-black hover:bg-white hover:text-black transition-all border border-white font-semibold rounded-lg lg:text-lg text-sm px-3 py-2 text-center'>View Available Cars</Link>
                    </div>
                </div>
            </div>
            <div className="bg-white flex flex-col justify-center items-center py-12">
                <h2 className='font-space text-[28px] text-black font-medium'>Why Choose Us?</h2>
                <div className="grid lg:grid-cols-3 grid-cols-1 gap-4 justify-center items-center w-11/12 mt-3">
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#c79520] to-[#fcc200] rounded-lg p-6'>
                        <IoCarSport className='text-black text-5xl'/>
                        <h3 className='text-black font-semibold font-space text-lg'>Wide Variety of Cars</h3>
                        <p className="text-white">Choose from economy to luxury, tailored to your needs.</p>
                    </div>
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#28A745] to-[#5FD88B] rounded-lg p-6'>
                        <IoWallet className='text-black text-5xl'/>
                        <h3 className='text-black font-semibold font-space text-lg'>Affordable Prices</h3>
                        <p className="text-white">Competitive daily rates you can count on.</p>
                    </div>
                    <div className='flex flex-col justify-center items-start bg-gradient-to-b from-[#007BFF] to-[#66B3FF] rounded-lg p-6'>
                        <BsFillMouseFill className='text-black text-5xl'/>
                        <h3 className='text-black font-semibold font-space text-lg'>Easy Booking Process</h3>
                        <p className="text-white">Seamlessly book your ride in just a few clicks.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;