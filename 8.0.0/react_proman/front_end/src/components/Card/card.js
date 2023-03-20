import React from "react";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
    return (
      <Link to={`/`} className="link">
        <div className=" w-[384px] h-[452px] bg-white rounded-lg "> 
          <div className="pt-6">
           <img src ={ item.image } alt = " image_article " className=" w-[336px] h-[224px] mx-auto rounded-lg hover:opacity-70"/> 
          </div>
          <div className="mx-6 "> 
            <h4 className=" text-[#93C5FD]  font-light text-[16px] mt-6 "> { item.title }</h4>
            <h3 className="text-2xl text-black font-semibold mb-[24px] "> { item.description } </h3>
            <Link to = {'#'}>
             <span className="text-main_color font-bold text-[20px]"> Read More 
             <i class="fa-solid fa-arrow-right ml-3"></i>
            </span> </Link>
          </div>
          
          
        </div>
      </Link>
    );
  };
  
  export default Card;
