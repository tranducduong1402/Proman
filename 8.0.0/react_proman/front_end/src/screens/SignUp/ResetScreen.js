import React from "react";
import logo from "../../data/image/logo_proman.png"
import { Link } from "react-router-dom";

function ResetPassword() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-100 to-blue-400">
      <div className="w-[380px] h-[23rem] p-10 shadow-lg bg-white rounded-lg">     
        <div className="flex justify-center">
           <img src= { logo } alt = " logo " className="w-[40px] h-[40px] mx-1 "/>      
           <h1 className="font-semibold text-[#2563EB] text-4xl text-center mb-5 font-bold"> PROMAN </h1>
        </div> 
        <h3 className="text-xl text-black text-center mb-2 font-semibold"> Forgot Password ?</h3>
        <h2 className="text-[#64748B] text-[10px] text-center mb-5">  Enter your email to reset your password. </h2>

        <div>
          <input
            type="text"
            id="email"
            className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg  mb-3  "
            placeholder="Email"
          />
        </div>

        <div className="shadow-sm ml-16" >
        <Link to = '/login'>
        <button type="submit" className=" text-white bg-[#2563EB] w-[30%] text-xs py-[10px] rounded-md hover:bg-opacity-80 mr-8" > Submit </button>

        </Link>
          <button type="submit" className=" text-black bg-[#F1F5F9] w-[30%] text-xs py-[10px] rounded-md hover:bg-opacity-80 hover:bg-main_color hover:text-white " > Cancel </button>
        </div >
       
      </div>
    </div>
  );
}

export default ResetPassword;
