import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div className="h-screen w-full bg-[url('/assets/carImg.png')] bg-cover bg-no-repeat bg-black relative bg-center">
            <h1 className="text-white text-center pt-10 text-5xl font-space">404 Page Not Found</h1>
            <Link to={'/'} className="absolute bottom-5 right-5 text-black font-medium rounded-lg font-space bg-white px-2 py-1">Back to Home</Link>
        </div>
    );
};

export default ErrorPage;