import React from "react";
import { motion } from "motion/react";
import { RiArticleFill } from "react-icons/ri";
import { FcGoogle } from "react-icons/fc";
import { linkWithCredential, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import { ServerUrl } from "../App";
import axios from "axios";
function Auth() {

    const handleGoogleAuth = async () => {
        try {
                const response = await signInWithPopup(auth, provider);
                let User = response.user
                let name= User.displayName
                let email = User.email
                const result = await axios.post(ServerUrl + "/api/auth/google", {name,email},{withCredentials:true})
                console.log(result.data)

            }catch (error) {
            console.log(error)
        }
}

    return (
        <div className = 'w-full min-h-screen flex bg-[#f3f3f3] justify-center items-center px-6 py-20'>
            <motion.div 
                className='w-full max-w-md p-8 rounded-3xl bg-white shadow-2xl border border-gray-200'
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5 }}>
                <div className='flex items-center justify-center gap-3 mb-6'>
                    <div className='bg-black text-white p-3 rounded-full inline-flex items-center justify-center'>
                        <RiArticleFill size={18} color='white' />
                    </div>
                    <h2 className='font-semibold text-lg'>Talent.Ai</h2>
                </div>
                <h1 className='text-2xl font-bold text-center mb-6'>Welcome to Talent.Ai
                    <span className='bg-green-100 text-green-600 px-2 py-1 rounded-full inline-flex items-center gap-2'>
                        AI-Powered Talent Acquisition</span>
                </h1>
                <p className = 'text-center text-gray-500 text-sm md:text-base leading-relaxed mb-8'>Sign in to start your journey with us</p>
                
                
                <motion.button 
                onClick={handleGoogleAuth}
                whileHover={{opacity:0.9,scale:1.03}}
                whileTap={{opacity:1,scale:0.97}}
                className='w-full flex items-center justify-center gap-3 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300'>
                    <FcGoogle size={20}/>
                    <span>Sign in with Google</span>
                
                
                </motion.button>

            </motion.div>
        </div>
    )
}

export default Auth
