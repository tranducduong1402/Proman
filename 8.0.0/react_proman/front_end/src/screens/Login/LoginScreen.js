import React, { useEffect, useState } from "react";
import logo from "../../data/image/logo_proman.png"
import { Link } from 'react-router-dom'
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../Redux/Actions/UserAction";

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const forms = {
    "userNameOrEmailAddress" : email,
    "password" : password
  }
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjMiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiVGluaERvIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvZW1haWxhZGRyZXNzIjoidGluaGRvQGdtYWlsLmNvbSIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTFJVS0tGSVM2Uk1TNjVVV0tKTUtCNE40SEUyMk5EN0QiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbiIsInN1YiI6IjMiLCJqdGkiOiJiMTI4YzJhYi00MWMxLTQ2OWUtODU2MS0xNjY5MzY3MzlmMGYiLCJpYXQiOjE2NzkyOTIxNzMsIm5iZiI6MTY3OTI5MjE3MywiZXhwIjoxNjc5Mzc4NTczLCJpc3MiOiJQcm9tYW4iLCJhdWQiOiJQcm9tYW4ifQ.XQuElT1mi9sQTHgL2vmkWCem0AnVQtva9VZ73O0Vn5E`,
    },
  };
  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-tr from-blue-100 to-blue-400">
      <div className="w-[380px] h-[28rem] p-10 shadow-lg bg-white rounded-lg">
        <div className="flex justify-center">
           <img src= { logo } alt = " logo " className="w-[40px] h-[40px] mx-1 "/>      
           <h1 className="font-semibold text-[#2563EB] text-4xl text-center mb-5 font-bold"> PROMAN </h1>
        </div> 
        <h3 className="text-sm text-black text-center mb-5 font-semibold"> Welcome back! </h3>
        <div>
          <input
            type="text"
            id="email"
            className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg  mb-3  "
            placeholder="Email"
            onChange={ (e) => setEmail (e.target.value)
            }
          />
        </div>

        <div>
        <input
          type="password"
          id="password"
          className="border w-full text-xs px-2 py-3 focus: outline-none focus:ring-0 focus:border-main_color rounded-lg mb-3 "
          placeholder="Password"
          onChange={ (e) => setPassword (e.target.value)
          }
        />    
      </div>
        <div className="text-end mb-3">
        <Link to ='/resetpassword'>
        <a href="#" className=" text-main_color text-xs"> Forgot Password?</a>

        </Link>
        </div>
        <div className="shadow-sm">
           <Link to ='/'>
             <button type="submit" className=" text-white bg-[#2563EB] w-full text-xs py-[10px] rounded-md hover:bg-opacity-80" onClick={ () => submit()} > Login </button>
           </Link>
         
        </div >
        <div className="text-center text-sm my-2 text-[#94A3B8]"> <span> OR </span> </div>
        <div className="w-full bg-white border-2 border-gray-300 shadow-sm py-2 text-center text-xs cursor-pointer hover:bg-[#2563EB] hover:text-white rounded-md hover:border-none">  
          <i class="fa-brands fa-google"></i>
          <span className="ml-1 font-medium"> Continue with Google </span>
        </div>
        <div className="text-xs text-center mt-3">
          <span> Not a member yet?</span>
          <Link className="text-main_color ml-4 " to="/register">
            {" "}
            Sign Up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
