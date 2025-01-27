import axios from "axios";
import { useEffect, useState } from "react";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GoArrowUpRight } from "react-icons/go";
import { IoMdPricetag } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { LuRefreshCw } from "react-icons/lu";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const AvailableCars = () => {
    const [cars, setCars] = useState([])
    const [grid, setGrid] = useState(true)
    const [selectedLowest, setSelectedLowest] = useState(null)
    const [selectedHighest, setSelectedHighest] = useState(null)
    useEffect(() => {
        axios.get('https://aura-drive.vercel.app/availableCars')
            .then(res => setCars(res.data))
    }, [])
    const handleLowest = () => {
        const sortedByLowest = [...cars].sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice)
        setCars(sortedByLowest)
        setSelectedLowest(true)
        setSelectedHighest(false)
    }

    const handleHighest = () => {
        const sortedByHighest = [...cars].sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice)
        setCars(sortedByHighest)
        setSelectedLowest(false)
        setSelectedHighest(true)
    }
    const handleSearch = (e) => {
        const q = e.target.value;
        axios.get(`https://aura-drive.vercel.app/cars/search?q=${q}`)
            .then(res => setCars(res.data))
        setSelectedLowest(null)
        setSelectedHighest(null)
    }

    const handleGrid = () => {
        setGrid(!grid)
    }

    const handleRefresh = e => {
        e.preventDefault()
        e.target.reset()
        axios.get('https://aura-drive.vercel.app/availableCars')
            .then(res => setCars(res.data))
        setSelectedLowest(null)
        setSelectedHighest(null)
    }
    return (
        <div className="flex flex-col justify-center items-center py-12 bg-white">
            <h1 className="font-space lg:text-4xl text-3xl mb-3 text-black text-center font-medium">Available Cars</h1>
            <form onSubmit={handleRefresh} className="py-1 flex flex-row gap-2 justify-center items-center">
                <div className="flex-row flex justify-between bg-white rounded-full border border-black px-3 py-[7px] items-center">
                    <input name="search" type="text" placeholder="Search cars by location" onChange={handleSearch} className="bg-white ml-2  text-black focus:outline-none" />
                    <IoSearch className="mr-3" />
                </div>
                <a className="cursor-pointer" data-tooltip-id="car-tooltip" data-tooltip-content={'Refresh Available Cars'} data-tooltip-place="top" >
                    <button type="submit" className="bg-black p-3 rounded-full">
                        <LuRefreshCw className="text-white font-bold" />
                    </button>
                </a>
                <Tooltip id="car-tooltip"></Tooltip>
            </form>
            <div className="flex lg:flex-row flex-col lg:justify-between justify-center w-11/12 items-center py-5">
                <div className="flex lg:flex-row flex-col gap-3">
                    <h4 className="text-black lg:text-left text-center font-semibold font-space text-xl">Sort By Price: </h4>
                    <div className="flex flex-row gap-3 justify-center items-center">
                        <button onClick={handleLowest} className={`px-4 py-1 ${selectedLowest ? 'text-white' : 'text-black'} font-space font-semibold hover:text-white hover:bg-black ${selectedLowest ? 'bg-black' : 'bg-white'} border border-black rounded-lg`}>Lowest First</button>
                        <button onClick={handleHighest} className={`px-4 py-1 ${selectedHighest ? 'text-white' : 'text-black'} font-space font-semibold hover:text-white hover:bg-black ${selectedHighest ? 'bg-black' : 'bg-white'} border border-black rounded-lg`}>Highest First</button>
                    </div>
                </div>
                <div className="flex lg:flex-row flex-col lg:mt-0 mt-3 gap-3">
                    <h4 className="text-black lg:text-left text-center font-semibold font-space text-xl">Select Layout: </h4>
                    <div className="flex flex-row gap-3 justify-center items-center">
                        {
                            grid ?
                                <button onClick={handleGrid} className={`px-4 py-1 text-white font-space font-semibold hover:text-white hover:bg-black bg-black border border-black rounded-lg flex gap-2 items-center`}>List <FaThList /></button> :
                                <button onClick={handleGrid} className={`px-4 py-1 text-white font-space font-semibold hover:text-white hover:bg-black bg-black border border-black rounded-lg flex gap-2 items-center`}>Grid <BsFillGrid3X3GapFill /></button>
                        }
                    </div>
                </div>
            </div>
            {
                grid ?
                    <div className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 w-11/12 justify-center items-center`}>
                        {
                            cars.map(car => (
                                <div key={car._id} className=" rounded-xl justify-center items-center flex w-[320px] h-[200px] relative" >
                                    <img src={car.imageUrl} alt={car.carModel} className="w-full h-full rounded-xl border border-black" />
                                    <h4 className="absolute text-white px-2 rounded-lg border border-black bg-black font-space font-medium text-[18px] top-3 left-3">${car.dailyRentalPrice}/day</h4>
                                    <Link to={`/car/${car._id}`} className="absolute border border-black text-white px-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] top-3 right-3 flex items-center">Book Now<GoArrowUpRight /></Link>
                                </div>
                            ))
                        }

                    </div> :
                    <div className="flex flex-col w-11/12 justify-center items-center gap-4">
                        {
                            cars.map(car => (
                                <div key={car._id} className="gap-4 rounded-xl justify-start items-center flex lg:h-[200px] h-fit lg:flex-row flex-col p-3 w-full border border-black" >
                                    <img src={car.imageUrl} alt={car.carModel} className="h-full rounded-xl w-[320px]" />
                                    <div className="flex flex-col gap-2">
                                        <h1 className="font-space text-black font-semibold text-xl">{car.carModel}</h1>
                                        <div className="flex flex-wrap gap-1 text-black font-space font-medium items-center">
                                            Features: 
                                            {
                                                car.features.map((feature, idx) => <p className="px-2 bg-[#a6a6a6d6] rounded-full text-white" key={idx}>{feature}</p>)
                                            }
                                        </div>
                                        <div className="flex flex-row gap-2">
                                            <div className="flex flex-row items-center text-black gap-1">
                                                <FaLocationDot /> {car.location}
                                            </div>
                                            <div className="flex flex-row items-center text-black gap-1">
                                                <IoMdPricetag /> ${car.dailyRentalPrice}/day
                                            </div>
                                        </div>
                                        <Link to={`/car/${car._id}`} className=" border border-black text-white px-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium w-fit text-[18px] top-3 right-3 flex items-center">Book Now<GoArrowUpRight /></Link>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
            }
        </div>
    );
};

export default AvailableCars;