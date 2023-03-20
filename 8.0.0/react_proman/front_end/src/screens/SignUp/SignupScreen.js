import React from "react";
import logo from "../../data/image/logo_proman.png"
import { Link } from "react-router-dom";

function SignUpScreen() {
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-100 to-blue-400">
      <div className="w-[380px] h-[31rem] p-10 shadow-lg bg-white rounded-lg">     
        <div className="flex justify-center">
           <img src= { logo } alt = " logo " className="w-[40px] h-[40px] mx-1 "/>      
           <h1 className="font-semibold text-[#2563EB] text-4xl text-center mb-5 font-bold"> PROMAN </h1>
        </div> 
        <h3 className="text-sm text-black text-center mb-5 font-semibold"> Create An Account </h3>
        <div>
          <input
            type="text"
            id="email"
            className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg  mb-3  "
            placeholder="Email"
          />
        </div>

        <div>
        <input
          type="password"
          id="password"
          className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg mb-3 "
          placeholder="Password"
          
        />    
      </div>
      <div>
      <input
        type="password"
        id="password"
        className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg mb-3 "
        placeholder="Comfirm Password"
        
      />    
    </div>

        <div className="shadow-sm">
        <Link to = '/'>
        <button type="submit" className=" text-white bg-[#2563EB] w-full text-xs py-[10px] rounded-md hover:bg-opacity-80" > Sign Up </button>

        </Link>
        </div >
        <div className="text-center text-sm my-2 text-[#94A3B8]"> <span> OR </span> </div>
        <div className="w-full bg-white border-2 border-gray-300 shadow-sm py-2 text-center text-xs cursor-pointer hover:bg-[#2563EB] hover:text-white rounded-md hover:opacity-80">  
          <i class="fa-brands fa-google"></i>
          <span className="ml-1 font-medium"> Continue with Google </span>  
        </div>
        <div className="text-xs text-center mt-3"> 
          <span> Already Have An Account? </span>
          <Link className="text-main_color ml-4" to="/login">  Sign In </Link>
        </div>
      </div>
    </div>
  );
}

export default SignUpScreen;
