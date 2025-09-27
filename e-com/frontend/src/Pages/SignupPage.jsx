import { useState } from "react";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../slices/userApiSlice";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../slices/authSlice";

const SignupPage = () => {

    const [name,setName] = useState('');
    const [newEmail,setNewEmail] = useState('');
    const [newPassword,setNewPassword] = useState('');

    const [ registerUser,{isLoading} ] = useRegisterUserMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const signupFormHandler = async(e)=>{
        e.preventDefault();

        if(newEmail === "" || newPassword === "" || name === ""){
            toast.error("Please Fill Both Fields");
        }else{
                 try{
                    const res = await registerUser({
                        name,
                        email: newEmail,
                        password: newPassword,
                    }).unwrap();

                    dispatch(setCredentials(res));
    
                    toast.success("Successfully Registered");
                    navigate("/");
    
                }catch(e){
                    toast.error(e?.data?.message);
                    console.log(e)
                }
        }
    }

  return (
    <main>
            <form className="max-w-sm mx-auto" onSubmit={signupFormHandler}>

                <label htmlFor="username-icon" className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                         <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round"
                            strokeWidth="2.5" fill="none" stroke="currentColor">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                            </g>
                        </svg>
                    </div>
                    <input type="text" value={name} onChange={(e)=>setName(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Username" />
                </div>

                <label htmlFor="email-address-icon" className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="text"  value={newEmail} onChange={(e)=>setNewEmail(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" />
                </div>

                <label htmlFor="password-icon" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Zm2 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <input type="password" onChange={(e)=>setNewPassword(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Password" />
                </div>

                <div className="flex gap-4">
                    <button type="submit" disabled={isLoading}
                        className={`mt-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            focus:outline-none focus:ring-4 ${isLoading
                            ? "bg-blue-400 cursor-not-allowed opacity-70"
                            : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300"
                            }`}>
                        { isLoading ? "Processing" : "Create Account"}
                    </button>
                    <p className="mt-7">If you already have account?</p>
                    <a className="mt-7 rounded underline hover:text-blue-600 transition-colors duration-200"
                     href="/login">Log In </a>

                </div>

            </form>
        </main>
  )
}

export default SignupPage