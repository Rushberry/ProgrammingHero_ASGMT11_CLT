import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

const AddCar = () => {
    const {user} = useContext(AuthContext)
    const userName = user?.displayName;
    const userEmail = user?.email;
    const handleSubmit = e => {
        e.preventDefault()
        const form = e.target;
        const email = userEmail;
        const name = userName;
        const carModel = form.model.value;
        const dailyRentalPrice = form.price.value;
        const availability = Boolean(form.availability.value);
        console.log(availability)
        const vehicleRegistrationNumber = form.registration.value;
        const features = form.features.value.split(', ');
        const description = form.description.value;
        const bookingCount = form.bookingCount.value;
        const imageUrl = form.img.value;
        const location = form.location.value;
        const submitDate = new Date().toISOString()
        const car = {name, email, carModel, dailyRentalPrice, availability, vehicleRegistrationNumber, features, description, bookingCount, imageUrl, location, submitDate};
        console.log(car)
        axios.post('http://localhost:2025/addCar', car)
        .then(res => {
            form.reset()
            toast.success('Car Added Successfully!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: false,
                        pauseOnHover: false,
                        theme: "light",
                    });
            console.log(res.data)})
    }
    return (
        <div className="bg-[url('/assets/carImg.png')] flex justify-center items-center h-auto bg-cover bg-no-repeat">
            <ToastContainer></ToastContainer>
            <div className="bg-transparent my-[100px] backdrop-blur-lg border border-white rounded-3xl mx-11">
                <div className="flex flex-col p-8 gap-4 text-white text-center w-full justify-center items-center">
                    <h1 className="font-bold text-[32px] font-space">Add Car</h1>
                    <p className="text-[16px] font-normal lg:w-[796px]">Add your car to our fleet and set it up for bookings. Share details and features for others to enjoy!</p>
                </div>
                <form className="flex flex-col mx-auto w-11/12 gap-4 mb-8" onSubmit={handleSubmit}>
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="model" type="text" placeholder="Car Model" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="price" type="number" placeholder="Daily Rental Price ($)" required />
                    <select className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="availability" placeholder="Availability" required>
                        <option className="hidden" value="" disabled selected>Availability</option>
                        <option value={true}>Available</option>
                        <option value={false}>Unavailable</option>
                    </select>
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="registration" type="text" placeholder="Vehicle Registration Number" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="features" type="text" placeholder="Features (e.g., GPS, AC, etc.)" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="description" type="text" placeholder="Description" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="bookingCount" type="number" defaultValue={0} placeholder="Booking Count" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="img" type="text" placeholder="Image Url" required />
                    <input className="bg-gray-50 border border-gray-300 text-black rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" name="location" type="text" placeholder="Location" required />
                    <button className="w-full text-white bg-black transition-all hover:bg-white hover:text-black border border-white font-semibold rounded-lg text-lg px-5 py-2.5 text-center font-space" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddCar;