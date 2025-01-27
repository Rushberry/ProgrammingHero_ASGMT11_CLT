import { createContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase.init";
import axios from "axios";
export const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [theme, setTheme] = useState(true)
    const [loader, setLoader] = useState(true)
    const [email, setEmail] = useState('')
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        setLoader(true)
        return signInWithPopup(auth, provider);
    }
    const updateUser = (data) => {
        // setLoader(true)
        return updateProfile(auth.currentUser, data);
    }
    const createUser = (email, password) => {
        setLoader(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const resetPassword = (email) => {

        setLoader(true)
        return sendPasswordResetEmail(auth, email);
    }
    const loginUser = (email, password) => {
        setLoader(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signOutUser = () => {
        setLoader(true)
        return signOut(auth);
    }
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser)
            if(currentUser?.email){
                const user = {email: currentUser.email}
                axios.post('https://aura-drive.vercel.app/jwt', user, {withCredentials: true})
                .then(res => {
                    setLoader(false)
                    console.log('Login >', res.data)})
            }
            else{
                axios.post('https://aura-drive.vercel.app/logout', {}, {withCredentials: true})
                .then(res => {
                    setLoader(false)
                    console.log('Logout >', res.data)})
            }
        })

        return () => {
            unSubscribe()
        }

    }, [])
    const authInfo = {
        email,
        setEmail,
        createUser,
        signOutUser,
        user,
        setUser,
        loginUser,
        resetPassword,
        loader,
        theme,
        setTheme,
        setLoader,
        signInWithGoogle,
        updateUser,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;