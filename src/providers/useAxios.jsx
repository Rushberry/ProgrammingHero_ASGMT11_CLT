import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthProvider";
import { useNavigate } from "react-router-dom";

const axiosInstance = axios.create({
    baseURL: 'https://aura-drive.vercel.app',
    withCredentials: true,
})

const useAxios = () => {
    const navigate = useNavigate()
    const { signOutUser } = useContext(AuthContext)
    useEffect(() => {
        axiosInstance.interceptors.response.use(res => {
            return res;
        }, err => {
            console.log('Error Caught On Live:', err)
            if (err.status === 401 || err.status === 403) {
                console.log('Logout User')
                signOutUser()
                navigate('/login')
            }
            return Promise.reject(err);
        })
    }, [])
    return axiosInstance;
};

export default useAxios;