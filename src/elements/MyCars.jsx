import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { GoArrowUpRight } from "react-icons/go";
import useAxios from "../providers/useAxios";

const MyCars = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxios()
    const userEmail = user?.email;
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [selectedLowest, setSelectedLowest] = useState(null)
    const [selectedHighest, setSelectedHighest] = useState(null)
    useEffect(() => {
        axiosSecure.get(`/myCars?email=${userEmail}`)
            .then(res => setData(res.data))
    }, [userEmail])
    const handleDelete = e => {
        axiosSecure.delete(`/deleteCar/${e}`)
            .then(() => {
                axiosSecure.get(`/myCars?email=${userEmail}`)
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
    const handleLowest = () => {
        const sortedByLowest = [...data].sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice)
        setData(sortedByLowest)
        setSelectedLowest(true)
        setSelectedHighest(false)
    }

    const handleHighest = () => {
        const sortedByHighest = [...data].sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice)
        setData(sortedByHighest)
        setSelectedLowest(false)
        setSelectedHighest(true)
    }

    const [info, setInfo] = useState([])
    const [id, setId] = useState(``)
    const car = info[0]
    const handleUpdate = (e, id) => {
        document.getElementById(e).showModal()
        axios.get(`https://aura-drive.vercel.app/car/${id}`)
            .then(res => {setInfo(res.data)
                setAvailability(res.data[0].availability)
            })
        // console.log(car)
        setId(id)
        // 
    }
    const [isAvailable, setAvailability] = useState('true')
    const handleChange = e => {
        if(e.target.value === 'true'){
            setAvailability(true)
        }
        else if (e.target.value === 'false'){
            setAvailability(false)
        }
        // console.log(isAvailable)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target;
        const carModel = form.model.value;
        const dailyRentalPrice = form.price.value;
        const availability = isAvailable;
        const vehicleRegistrationNumber = form.registration.value;
        const features = form.features.value.split(',');
        const description = form.description.value;
        const imageUrl = form.img.value;
        const location = form.location.value;
        const car = { carModel, dailyRentalPrice, availability, vehicleRegistrationNumber, features, description, imageUrl, location };
        axiosSecure.patch(`/updateCar/${id}`, car)
            .then(() => {
                axiosSecure.get(`/myCars?email=${userEmail}`)
                    .then(res => setData(res.data))
                toast.success('Updated Successfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: false,
                    theme: "light",
                });
                document.getElementById(`${id}U`).close()
                setTimeout(() => {
                    navigate("/myCars")
                }, 2050)
            })
    }
    return (
        <div className="bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <ToastContainer></ToastContainer>
            {data.length ?

                <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-3xl mx-11 w-full">
                    <div className="flex flex-col p-8 gap-4 text-white text-center w-full justify-center items-center">
                        <h1 className="font-bold text-[32px] font-space">My Cars</h1>
                        <p className="text-[16px] font-normal lg:w-[796px]">View and manage your listed cars in one place! Keep track of the vehicles you've added and update their details easily.</p>
                        <div className="flex lg:flex-row items-center flex-col gap-3">
                            <h4 className="lg:text-left text-white text-center font-medium font-space text-md">Sort By Price: </h4>
                            <div className="flex flex-row gap-3 justify-center items-center">
                                <button onClick={handleLowest} className={`px-4 py-1 ${selectedLowest ? 'text-black' : 'text-white'} font-space font-medium hover:text-black hover:bg-white ${selectedLowest ? 'bg-white' : 'bg-transparent'} border border-white rounded-lg`}>Lowest First</button>
                                <button onClick={handleHighest} className={`px-4 py-1 ${selectedHighest ? 'text-black' : 'text-white'} font-space font-medium hover:text-black hover:bg-white ${selectedHighest ? 'bg-white' : 'bg-transparent'} border border-white rounded-lg`}>Highest First</button>
                            </div>
                        </div>
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
                                                <button className="bg-black px-3 py-2 rounded-lg border border-white text-[#21f904]" onClick={() => { handleUpdate(`${car?._id}U`, `${car?._id}`) }}>Update</button>
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
                                                <dialog id={`${car?._id}U`} className="modal">
                                                    <div className="modal-box bg-white border text-black font-space border-black scrollbar scrollbar-thumb-black scrollbar-track-transparent scrollbar-thumb-rounded ">
                                                        <form method="dialog">
                                                            <button className="btn bg-black hover:bg-black text-white hover:text-white btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
                                                        </form>
                                                        <p className="py-4 font-space font-medium text-[18px] w-full">Are you sure you want to update this car? <br /> Please confirm your changes to ensure the car details are accurate.</p>
                                                        <form className="flex flex-col mx-auto gap-4 mb-8" onSubmit={handleSubmit}>
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="model" type="text" placeholder="Car Model" defaultValue={`${car?.carModel}`} required />
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="price" type="number" placeholder="Daily Rental Price ($)" defaultValue={car?.dailyRentalPrice} required />
                                                            <select  onChange={handleChange} value={isAvailable} className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="availability" placeholder="Availability"  required>
                                                                <option value={'true'}>Available</option>
                                                                <option value={'false'}>Unavailable</option>
                                                            </select>
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="registration" type="text" placeholder="Vehicle Registration Number" defaultValue={car?.vehicleRegistrationNumber} required />
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="features" type="text" placeholder="Features (e.g., GPS, AC, etc.)" defaultValue={car?.features} required />
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="description" type="text" placeholder="Description" defaultValue={car?.description} required />
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="img" type="text" placeholder="Image Url" defaultValue={car?.imageUrl} required />
                                                            <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="location" type="text" placeholder="Location" defaultValue={car?.location} required />
                                                            <button className="w-full text-white bg-black transition-all hover:bg-black hover:text-white border border-black font-semibold rounded-lg text-lg px-5 py-2.5 text-center font-space" type="submit">Update</button>
                                                        </form>
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
                        <p className="text-[16px] flex gap-5 items-center justify-between font-normal px-3">No cars found. Click the button to add a car and get started!
                            <Link className="border w-fit border-white text-white px-5 py-2 hover:bg-white hover:text-black rounded-lg bg-black font-space font-medium text-[18px] flex items-center" to={'/addCar'}>Add Car<GoArrowUpRight /></Link>
                        </p>
                    </div>
                </div>

            }
        </div>
    );
};

export default MyCars;