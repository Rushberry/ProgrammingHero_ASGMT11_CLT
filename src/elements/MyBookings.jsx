import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Chart from "./Chart";
import { AiOutlineDelete } from "react-icons/ai";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineDateRange } from "react-icons/md";
const MyBookings = () => {
    const { user } = useContext(AuthContext)
    const userEmail = user?.email;
    const [data, setData] = useState([])
    const [chartData, setChartData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:2025/myBookings?email=${userEmail}`)
            .then(res => setData(res.data))
    }, [userEmail])
    useEffect(() => {
        axios.get(`http://localhost:2025/confirmed?email=${userEmail}`)
            .then(res => setChartData(res.data))
    }, [userEmail])
    const handleCancel = (e, id) => {
        axios.patch(`http://localhost:2025/bookingStatus/${e}`)
            .then(() => {
                axios.get(`http://localhost:2025/myBookings?email=${userEmail}`)
                    .then(res => setData(res.data))
            })
        document.getElementById(`${e}`).close()
        axios.patch(`http://localhost:2025/updateBooking/${id}`)
            .then(res => console.log(res.data))
        axios.get(`http://localhost:2025/confirmed?email=${userEmail}`)
            .then(res => setChartData(res.data))
    }
    const [dateData, setDateData] = useState(new Date())
    const handleDateChange = (e) => {
        setDateData(e.target.value)
    }

    const handleModify = (e) => {
        const dateTime = new Date(dateData).toISOString()
        const car = { bookingDateUpdated: dateTime }
        axios.patch(`http://localhost:2025/modifyDate/${e}`, car)
            .then(() =>document.getElementById(`${e}D`).close())
    }
    useEffect(() => {
        axios.get(`http://localhost:2025/myBookings?email=${userEmail}`)
            .then(res => setData(res.data))
    })
    return (
        <div id="booking" className="bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <ToastContainer></ToastContainer>
            {data.length ?
                <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-3xl mx-11 w-full">
                    <div className="flex flex-col p-8 gap-4 text-white text-center w-full justify-center items-center">
                        <h1 className="font-bold -mb-12 text-[32px] font-space">My Bookings</h1>
                        {chartData.length ? <Chart data={chartData}></Chart> : <div className="mt-12 mb-6"> </div>}
                        <p className="text-[16px] -mt-12 font-normal lg:w-[796px]">View and manage your bookings effortlessly! Keep track of all your reservations and update their details with ease to ensure a smooth experience.</p>
                    </div>
                    <div className="flex flex-col mx-auto w-11/12 gap-4 mb-8">
                        <div className="overflow-x-auto overflow-y-auto h-screen">
                            <table className="table-sm w-fit font-space text-white">
                                <thead>
                                    <tr className="border-white border-y">
                                        <th className="font-extrabold">Car Image</th>
                                        <th className="font-extrabold">Car Model</th>
                                        <th className="font-extrabold">Booking Date</th>
                                        <th className="font-extrabold">Total Price</th>
                                        <th className="font-extrabold">Booking Status</th>
                                        <th className="font-extrabold">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(car => <tr className="border-b max-w-xs border-white" key={car?._id}>
                                            <th>
                                                <img className="lg:w-[200px] w-full rounded " src={car?.imageUrl} alt={car?.carModel} />
                                            </th>
                                            <th className="font-normal text-lg text-center">{car?.carModel}</th>
                                            <th className="font-normal text-lg text-center">{moment(car?.bookingDate).format('DD-MM-YYYY HH:mm')}</th>
                                            <th className="font-normal text-lg text-center">{car?.dailyRentalPrice}</th>
                                            <th className="font-normal text-lg text-center">{(car?.bookingStatus === 'confirmed') ? <p className='text-green-800 font-space text-sm font-medium bg-green-300 rounded-full px-2 w-fit'>Confirmed</p> : <p className='w-fit text-red-800 font-space text-sm font-medium bg-red-300 rounded-full px-2'>Canceled</p>}</th>
                                            <th className="flex gap-2 lg:my-6 justify-center items-center lg:flex-row md:flex-row flex-col">
                                                <button className="text-white px-3 py-2 rounded-lg border border-white bg-[#0493f9] flex items-center gap-1" onClick={() => document.getElementById(`${car?._id}D`).showModal()}><MdOutlineDateRange /> Modify<span></span>Date </button>
                                                <button className="text-white px-3 py-2 rounded-lg border border-white bg-[#f90404] flex items-center gap-1" onClick={() => document.getElementById(`${car?._id}`).showModal()}> <AiOutlineDelete /> Cancel</button>
                                                <dialog id={`${car?._id}`} className="modal">
                                                    <div className="modal-box bg-black border font-space border-red-900">
                                                        <p className="py-4 text-white font-space font-medium text-[18px] w-full">Are you sure you want to cancel this booking?</p>
                                                        <div className="modal-action">
                                                            <button className="btn bg-red-900 text-white hover:bg-red-600 text-[16px]" onClick={() => { handleCancel(car?._id, car?.carId) }}>Yes</button>
                                                            <form method="dialog">
                                                                <button className="btn  text-[16px]">No</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                                <dialog id={`${car?._id}D`} className="modal">
                                                    <div className="modal-box bg-black border font-space border-[#0493f9]">
                                                        <p className="py-4 font-space font-medium text-white text-[18px] w-full">Are you sure you want to modify booking date?</p>
                                                        <input type="date" onChange={handleDateChange} id="dateCount" className="block w-full px-3 py-2 text-white border border-white rounded-lg focus:white focus:border-white sm:text-sm bg-[#0493f9] cursor-pointer shadow-sm" />
                                                        <div className="modal-action">
                                                            <button className="btn bg-[#0493f9] text-white hover:bg-[#0493f9] text-[16px]" onClick={() => { handleModify(car?._id) }}>Confirm</button>
                                                            <form method="dialog">
                                                                <button className="btn  text-[16px]">Cancel</button>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </dialog>
                                            </th>
                                        </tr>)
                                    }
                                </tbody>
                                <tfoot></tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                :
                <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-xl mx-11 w-fit">
                    <div className="flex flex-col py-4 px-2 text-white text-center w-full justify-between items-center">
                        <p className="text-[16px] flex gap-5 items-center justify-between font-normal px-3">No bookings found. Click the button to book a car and get started!
                            <Link className="border w-fit border-white text-white px-5 py-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] flex items-center" to={'/availableCars'}>Book A Car<GoArrowUpRight /></Link>
                        </p>
                    </div>
                </div>
            }
        </div>
    );
};

export default MyBookings;