import { useContext } from 'react';
import { GoArrowUpRight } from 'react-icons/go';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';

const Car = () => {
    const { user } = useContext(AuthContext)
    const userName = user?.displayName;
    const userEmail = user?.email;
    const loader = useLoaderData()
    const data = loader[0]
    const navigate = useNavigate()
    const handleGoBack = () => {
        navigate(-1)
    }
    const handleBooking = () => {
        const email = userEmail;
        const name = userName;
        const carModel = data?.carModel;
        const dailyRentalPrice = data?.dailyRentalPrice;
        const imageUrl = data?.imageUrl;
        const bookingDate = new Date().toISOString()
        const bookingStatus = 'confirmed'
        const carId = data?._id
        const bookingData = {
            name, email, carModel, dailyRentalPrice, imageUrl, bookingDate, bookingStatus, carId
        }
        console.log(bookingData)
        axios.post('http://localhost:2025/booking', bookingData)
        .then(res => {
            axios.patch(`http://localhost:2025/updateBookingCount/${data?._id}`)
            .then(res => 
                {
                    if(res.data.acknowledged){
                        navigate('/myBookings')
                    }
                    console.log(res.data)
                })
            console.log(res.data)})
    }
    return (
        <div className="bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <div className="bg-transparent flex flex-col justify-center items-center my-[100px] backdrop-blur-lg border border-white rounded-3xl lg:mx-11 mx-5 lg:w-8/12 w-10/12">
                <div className="flex lg:flex-row flex-col gap-3 p-8 text-white text-center w-full justify-center items-center">
                    <h1 className="font-space lg:text-4xl text-3xl text-white text-center font-medium">{data?.carModel}</h1>
                    <p>
                        {
                            data?.availability ? <p className='text-green-800 font-space font-medium bg-green-300 rounded-full px-2'>Available</p> : <p className='text-red-800 font-space font-medium bg-red-300 rounded-full px-2'>Unavailable</p>
                        }
                    </p>
                </div>
                <div className="flex lg:flex-row flex-col gap-2 -mt-6 mb-4 justify-center items-center">
                    <h4 className=" text-white px-3 py-1 rounded-lg border border-white bg-black font-space font-medium text-[18px]">Price Per Day: ${data.dailyRentalPrice}</h4>
                </div>
                <div className="flex flex-wrap gap-1 text-white mb-3 font-space font-medium items-center justify-center">
                    Features:
                    {
                        data?.features.map((feature, idx) => <p className="px-2 bg-[#a6a6a6d6] rounded-full text-white" key={idx}>{feature}</p>)
                    }
                </div>
                <div className="flex flex-row gap-3 justify-between w-11/12 mb-4">
                    <button className="border border-white text-white px-5 py-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] flex items-center" onClick={handleGoBack}>Go Back</button>
                    <button className="border border-white text-white px-5 py-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] flex items-center" onClick={() => { document.getElementById(`${data?._id}`).showModal() }}>Book Now<GoArrowUpRight /></button>
                </div>
                <img src={data?.imageUrl} alt={data?.carModel} className="w-11/12 rounded-3xl" />
                <p className="bg-black p-5 w-11/12 border border-white rounded-3xl mt-6 lg:mb-9 mb-4 text-white">{data?.description}</p>
            </div>
            <dialog id={`${data._id}`} className="modal">
                <div className="modal-box bg-black border border-white">
                    <p className=" font-space text-[18px]">
                        You're about to book the {data?.carModel}! This vehicle, available for just ${data?.dailyRentalPrice} per day, is packed with features like: {data?.features.map(feature => <>{feature.toLowerCase()}, </>)} It’s currently {data?.availability ? 'available' : 'unavailable'}, so don’t miss out on the opportunity to drive in style! Pickup location: {data?.location}. Ready to confirm your booking?
                    </p>
                    <div className="modal-action">
                        <button className="btn font-space bg-white hover:bg-white hover:text-black text-black text-[16px]" onClick={handleBooking}>Confirm Booking</button>
                        <form method="dialog">
                            <button className="btn font-space text-[16px]">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default Car;