import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../data/image/logo_proman.png";
import rollback from "../../data/image/roll_back.png";
import UserScreen from "../../screens/User/UserScreen";
import Dropdown from "../Dropdown/Dropdown";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [openDrop, setOpenDrop] = useState(true);
  const [openJob, setOpenJob] = useState(true);
  const Admin = {
    title: "Admin",
    children1: " User",
    children2: " Role ",
    children3: " Client ",
    children4: " Position User ",
    status: openDrop,
    statusNav: open,
  };

  const Job = {
    title: "Job",
    children1: " Project ",
    children2: " Task ",
    status: openJob,
    statusNav: open,
  };

  const Menus = [{ title: "Dashboard", src: "fa-sharp fa-solid fa-bolt" }];

  return (
    <div className="flex">
      <div
        className={` ${
          open ? "w-72" : "w-20 "
        } bg-[#FBFBFB] h-screen p-5  pt-8 relative duration-300`}
      >
        <img
          src={rollback}
          className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
          onClick={() => setOpen(!open)}
        />
        <div className="flex gap-x-4 items-center">
          <img
            src={logo}
            className={`cursor-pointer  w-[42px] h-[42px] duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-main_color origin-left font-medium text-xl duration-200  text-[35px] ${
              !open && "scale-0"
            }`}
          >
            PROMAN
          </h1>
        </div>

        <div className=" text-[#BDBDBD] mt-6"> Main Menu </div>
        <ul className="pt-4">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className=
              {`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-main_color hover:text-white`}
            >
              <i className={`${Menu.src} pl-2`}> </i>
              <span
                className={`${
                  !open && "hidden"
                } origin-left duration-200 text-[#BDBDBD] text-[18px] hover:text-white`}
              >
                {Menu.title}
              </span>
            </li>
          ))}

          <div
            className="flex hover:bg-main_color rounded-md p-[5px] cursor-pointer mt-5"
            onClick={() => setOpenDrop(!openDrop)}
          >
            <i class="fa-solid fa-user text-[#BDBDBD]  mx-2 text-[13px] my-auto "></i>
            <li
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-[#BDBDBD] text-[18px] flex font-normal ml-4`}
            >
              <button>
                Admin
                <i
                  class={`fa-solid fa-chevron-right text-[12px] ml-16 ${
                    !openDrop && "rotate-90"
                  } duration-300`}
                ></i>
              </button>
            </li>
          </div>
          <Dropdown data={Admin} />


          <div
            className="flex hover:bg-main_color rounded-md p-[5px] cursor-pointer mt-5"
            onClick={() => setOpenJob(!openJob)}
          >
            <i class="fa-brands fa-microsoft text-[#BDBDBD]  mx-2 text-[13px] my-auto"></i>
            <li
              className={`${
                !open && "hidden"
              } origin-left duration-200 text-[#BDBDBD] text-[18px] flex font-normal ml-4`}
            >
              <button>
                Job
                <i
                  class={`fa-solid fa-chevron-right text-[12px] ml-[85px] ${
                    !openJob && "rotate-90"
                  } duration-300`}
                ></i>
              </button>
            </li>
          </div>

          <div className={`${ Job.status && "hidden" }  text-black  ${ !Job.statusNav && "hidden" }` }>

          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 align-middle">
            <li >    
            <Link to='/login'>
            <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
            <span className='text-[20px] pr-5'> - </span>
             { Job.children1}</h2>
            </Link> 
            </li>
            <li>
             <Link to='/login'>
              <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
               <span className='text-[20px] pr-5'> - </span>
                 { Job.children2}</h2>
             </Link>      
             </li>
          </ul>
         </div>

        <li  className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 hover:bg-main_color mt-[10px]`}>
        <i class="fa-regular fa-pen-to-square pl-1"></i>
         <span  className={`${
            !open && "hidden"
          } origin-left duration-200 text-[#BDBDBD] text-[18px]`}> Review </span>
        </li>
         

        <li  className= { `${
            !open && "hidden"
          } origin-left duration-200 mt-9 `}>
         <h2 className="text-[16px] mb-2"> Project Management </h2>
         <h3 className=" text-[#828282] text-xs mb-2"> © 2023 All Rights Reserved </h3>
         <h3 className=" text-colorText text-[14px]"> Made with 
         <i class="fa-solid fa-heart text-red-600"></i>
         </h3>
        </li>
        </ul>
      </div>
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <h1 className="text-2xl font-semibold ">Home Page</h1>
        <UserScreen/>
        
    </div>
      
    </div>
  );
};

export default Sidebar;
