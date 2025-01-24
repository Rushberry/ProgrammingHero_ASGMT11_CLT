import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Link } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";

const MyCars = () => {
    const { user } = useContext(AuthContext)
    const userEmail = user?.email;
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get(`http://localhost:2025/myCars?email=${userEmail}`)
            .then(res => setData(res.data))
    }, [userEmail])
    const handleDelete = e => {
        axios.delete(`http://localhost:2025/deleteCar/${e}`)
            .then(() => {
                axios.get(`http://localhost:2025/myCars?email=${userEmail}`)
                    .then(res => setData(res.data))
            })
        toast.success('Car Deleted Successfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            theme: "light",
        });
    }
    return (
        <div className="bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <ToastContainer></ToastContainer>
            {data.length ?

                <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-3xl mx-11 w-full">
                    <div className="flex flex-col p-8 gap-4 text-white text-center w-full justify-center items-center">
                        <h1 className="font-bold text-[32px] font-space">My Cars</h1>
                        <p className="text-[16px] font-normal lg:w-[796px]">View and manage your listed cars in one place! Keep track of the vehicles you've added and update their details easily.</p>
                    </div>
                    <div className="flex flex-col mx-auto w-11/12 gap-4 mb-8">
                        <div className="overflow-x-auto">
                            <table className="table-sm w-fit font-space text-white">
                                <thead>
                                    <tr className="border-white border-y">
                                        <th className="font-extrabold">Car Image</th>
                                        <th className="font-extrabold">Car Model</th>
                                        <th className="font-extrabold">Daily Rental Price</th>
                                        <th className="font-extrabold">Booking Count</th>
                                        <th className="font-extrabold">Availability</th>
                                        <th className="font-extrabold">Date Added</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map(car => <tr className="border-b max-w-xs border-white" key={car?._id}>
                                            <th>
                                                <img className="lg:w-[200px] w-full rounded " src={car?.imageUrl} alt={car?.carModel} />
                                            </th>
                                            <th className="font-normal text-lg text-center">{car?.carModel}</th>
                                            <th className="font-normal text-lg text-center">{car?.dailyRentalPrice}</th>
                                            <th className="font-normal text-lg text-center">{car?.bookingCount}</th>
                                            <th className="font-normal text-lg text-center">{(car?.availability) ? <p className='text-green-800 font-space text-sm font-medium bg-green-300 rounded-full px-2 w-fit'>Available</p> : <p className='w-fit text-red-800 font-space text-sm font-medium bg-red-300 rounded-full px-2'>Unavailable</p>}</th>
                                            <th className="font-normal text-lg text-center">{moment(car?.submitDate).format('Do MMMM YYYY')}</th>
                                            <th className="flex gap-2 lg:my-5 justify-center items-center lg:flex-row md:flex-row flex-col">
                                                <Link className="bg-black px-3 py-2 rounded-lg border border-white text-[#21f904]" to={`/updateReview/${car?._id}`}>Update</Link>
                                                <button className="bg-black px-3 py-2 rounded-lg border border-white text-[#f90404]" onClick={() => document.getElementById(`${car?._id}`).showModal()}>Delete</button>
                                                <dialog id={`${car?._id}`} className="modal">
                                                    <div className="modal-box bg-black border font-space border-red-900">
                                                        <p className="py-4 font-space font-medium text-[18px] w-full">Are you sure you want to delete this car? <br /> This action cannot be undone and will permanently remove the car from the system.</p>
                                                        <div className="modal-action">
                                                            <button className="btn bg-red-900 text-white hover:bg-red-600 text-[16px]" onClick={() => { handleDelete(car?._id) }}>Delete</button>
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
                <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-3xl mx-11 w-fit">
                    <div className="flex flex-col p-8 gap-4 text-white text-center w-full justify-center items-center">
                        <p className="text-[16px] flex gap-5 items-center justify-center font-normal px-3">No cars found. Click the button to add a car and get started!
                            <Link className="border w-fit border-white text-white px-5 py-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] flex items-center" to={'/addCar'}>Add Car<GoArrowUpRight /></Link>
                        </p>
                    </div>
                </div>

            }
        </div>
    );
};

export default MyCars;