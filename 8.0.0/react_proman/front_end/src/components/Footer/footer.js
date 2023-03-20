import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
    <div className="mx-32 mt-[80px] mb-14"> 
        <div className="w-full h-[280px] flex "> 
          <div className="flex-[30%]">
             <h3 className=" text-main_color font-bold text-2xl "> PROMAN </h3>
             <h4 className=" text-[#999999] text-[14px] w-[304px] mt-[15px] "> 
             Use the shortest possible time to create tasks, 
             use all the free features to make the most of 
             them and online collaborative management
             </h4>
             <div className="flex text-main_color text-[20px] justify-around w-[180px] mt-[35px]">
               <i class="fa-brands fa-facebook-f"></i>
               <i class="fa-brands fa-instagram"></i>
               <i class="fa-brands fa-twitter"></i>
               <i class="fa-brands fa-youtube"></i>
             </div>
          </div>

          <div className=" flex-[70%]">
             <div className="grid grid-cols-4 gap-x-4  max-w-4xl">
              <div> 
                <h2 className=" text-main_color text-[18px] font-bold"> Company </h2>
                <div className=" text-[#999999] text-[14px]"> 
                <h3 className=" mt-[20px]"> About Us </h3>
                <h3 className=" mt-[20px]"> Career </h3>
                <h3 className=" mt-[20px]" > Prees Kit </h3>
                <h3 className=" mt-[20px]" > Contact Us </h3>
                </div>
                
              </div>

              <div> 
                <h2 className="text-main_color text-[18px] font-bold"> Products </h2>
                <div className=" text-[#999999] text-[14px]"> 
                  <h3 className=" mt-[20px]"> Pricing Kit </h3>
                  <h3 className=" mt-[20px]"> Enterprise  </h3>
                  <h3 className=" mt-[20px]">  Integration </h3>
                  <h3 className=" mt-[20px]"> New Product </h3>
                </div>
              </div>

              <div > 
                <h2 className="text-main_color text-[18px] font-bold" > Resources </h2>
                <div className=" text-[#999999] text-[14px]" > 
                 <h3 className=" mt-[20px]"> Blog Service </h3>
                 <h3 className=" mt-[20px]"> Help Center </h3>
                 <h3 className=" mt-[20px]"> Guidelines </h3>
                 <h3 className=" mt-[20px]"> Documentation </h3>
                </div>
                
              </div>
             <div> 
               <h2 className="text-main_color text-[18px] font-bold"> Our Support </h2>
                 <div className=" text-[#999999] text-[14px]" >
                  <h3 className=" mt-[20px]" > Talk to Support </h3>
                  <h3 className=" mt-[20px]"> API Document </h3>
                  <h3 className=" mt-[20px]"> System Status </h3>
                  <h3 className=" mt-[20px]"> Support Docs </h3>
                 </div>
               
             </div>

             </div>
          </div>
          
        </div>
        <div className="text-center text-black">
          <h2> Copyright 2023 PROMAN All Right Reserved </h2>
        </div>
        
    </div>
    );
  };
  
  export default Footer;