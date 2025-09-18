import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector,useDispatch } from "react-redux";
import { useLocation,useNavigate } from "react-router-dom";
import { useLoginMutation } from "../slices/userApiSlice";
import { setCredentials } from "../slices/authSlice";
import { setCartFromServer } from "../slices/cartSlice";
import "react-toastify/dist/ReactToastify.css";


const LoginPage = () => {

    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {search} = useLocation();
    
    const sp = new URLSearchParams(search)
    const redirect = sp.get("redirect") || ("/");

    const [login, {isLoading}] = useLoginMutation();
    const { userInfo } = useSelector((state)=>state.auth);

    useEffect(()=>{
        if(userInfo){
            navigate(redirect)
        }
    },[redirect,userInfo])

    const cartFromLocalStorage = JSON.parse(localStorage.getItem("cartItems")) || [];

    const formHandler = async(e)=>{

        e.preventDefault();
       
        if(email === "" || password === ""){
            toast.error("Please Fill Both Fields");
        }
        else{
            try{
                const res = await login({ email, password,localCart:cartFromLocalStorage  }).unwrap();
                console.log("SERVER LOGIN RESPONSE:", res);
                
                dispatch(setCredentials({...res}));
                dispatch(setCartFromServer(res.cart));
                localStorage.removeItem("cartItems");
                toast.success("Successfully Logged In");
                navigate("/");

            }catch(e){
                toast.error(e?.data?.message);
                console.log(e)
            }
        }
    }

    return (
        <main>
            <form className="max-w-sm mx-auto" onSubmit={formHandler}>
                <label htmlFor="email-address-icon" className="mt-5 block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                        </svg>
                    </div>
                    <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} id="email-address-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" />
                </div>

                <label htmlFor="email-address-icon" className="block mt-2 mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 dark:text-gray-400">
                            <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 2a4 4 0 0 0-4 4v2H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-1V6a4 4 0 0 0-4-4Zm-2 6V6a2 2 0 1 1 4 0v2H8Zm2 5a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </div>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Password" />
                </div>

                <div className="flex gap-5">
                    <button type="submit" disabled={isLoading} className={`mt-5 text-white font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 
                            focus:outline-none focus:ring-4 ${isLoading 
                            ? "bg-blue-400 cursor-not-allowed opacity-70" 
                            : "bg-blue-700 hover:bg-blue-800 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            }`}>
                        {isLoading ? "Signing In" : "Sign In"}
                    </button>

                    <a href="/signup"
                        className="mt-5 focus:outline-none text-white bg-yellow-950 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
                        Sign UP
                    </a>

                </div>

            </form>
        </main>
    )
}

export default LoginPage