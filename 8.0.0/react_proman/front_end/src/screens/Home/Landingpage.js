import React from "react";
import logo from "../../data/image/logo_proman.png"
import header from "../../data/image/header.png"
import backgroundChart from "../../data/image/bg_chart.png"
import Card from "../../components/Card/card";
import chart_3 from "../../data/image/chart_3.png"
import chart_2 from "../../data/image/chart_2.png"
import chart_1 from "../../data/image/chart_1.png"
import footer from "../../data/image/footer.png"
import Footer from "../../components/Footer/footer";
import { Link } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";

function Landing_page() {
  const data = 
  [
    {
      id: 1,
      image: "https://img.freepik.com/free-photo/happy-young-asian-businessmen-businesswomen-meeting-brainstorming-ideas_7861-3089.jpg?w=1380&t=st=1678794396~exp=1678794996~hmac=589fec1853557f793fe402dc4b9cc13a6d894dbc370a993b1fbedc2ee726df78",
      title: " OFFICE WORK ",
      description: "Meeting Project With Good Team at Beautiful Place "
    },

    {
      id:2,
      image: "https://img.freepik.com/free-photo/asia-businesswoman-social-distancing-new-normal-virus-prevention-looking-camera-presentation-colleague-about-plan-video-call-while-work-office-night_7861-3196.jpg?w=1380&t=st=1678812747~exp=1678813347~hmac=db2463def2c82e5152ed59c681a0593d5e8aceb184869ee3b2c706546abde3c1",
      title: " REAL ESTATE ",
      description: "How To Build Your House For Your Good Dream Estate  "
    },

    {
      id: 3,
      image: "https://img.freepik.com/free-photo/millennial-group-young-businesspeople-asia-businessman-businesswoman-celebrate-giving-five-after-dealing-feeling-happy-signing-contract-agreement-meeting-room-small-modern-office_7861-2516.jpg?w=1060&t=st=1678812784~exp=1678813384~hmac=118423284208f9a85681ae605884b38d94ce5a98b9b85ab08fdfddb5fb7755b5",
      title: " OFFICE WORK ",
      description: " Project Management Tell About Office Work "
    }
  
  ]
    return (
      <div>
      
        <div className="mt-9 flex justify-evenly px-[100px] h-[610px] w-full">
          <div className="flex-1 ">
            <div className="flex"> 
             <img src= { logo } alt = " logo " className="w-[40px] h-[40px] mx-1 "/>      
             <h1 className="font-semibold text-[#2563EB] text-4xl text-center mb-5 font-bold"> PROMAN </h1>
            </div>
            <div className="w-[551px] h-[264px] text-[55px] font-bold mt-10"> 
              <span > Make Management Way More Easier Than Ever With </span>
               <span className="text-main_color"> Us </span> 
           </div>
              <h5 className="text-[#999999] text-[16px] "> Use the shortest possible time to create tasks, use all the free features to make the most of them and online collaborative management platform to bring more than efficiency and performance for manage your project beloved </h5>
            <div className="mt-8">
              <button className=" text-white text-xs bg-main_color py-3 px-4 rounded-lg mr-4 hover:opacity-80"> Learn More </button>
              <button
               className=
               " text-main_color border-2 border-main_color rounded-lg py-3 px-4 text-xs font-bold hover:text-white hover:bg-main_color"
               >
                Contact Us 
              </button>
            </div>

          </div>

        <div className="flex-1 ml-6">
          <div className="flex justify-end">
            <Link to= '/register'>
              <button className=" text-white bg-[#2563EB] w-[115px] h-[44px] text-xs rounded-md hover:bg-opacity-80 mr-8"> 
                Sign Up
              </button>
            </Link>

             <Link to='/login'>
               <button
                className =
               "bg-white text-main_color border-2 border-main_color text-xs w-[115px] h-[44px] rounded-md hover:bg-main_color hover:text-white opacity-80 font-bold"
                >
            Login 
           </button>
             </Link>
            
          </div>
          <div className="w-3/5 mt-[70px] ml-48">
             <img src={ header } alt= "header" />
          </div>  
        </div>
      </div>
         
      <div className="w-full h-[464px] bg-[#F7F7F7] ">
          <div className="pt-12">
           <h4 className=" text-main_color font-normal text-xl text-center"> Feature </h4> 
           <h1 className="text-center text-black font-bold text-4xl mt-2"> Our Special Feature </h1>
          </div>
          <div className="grid grid-cols-3 gap-x-6 mx-[186px] max-w-6xl mt-[41px]"> 

            <div className=" bg-white w-72 h-60 rounded-lg">
                <div className="bg-[#EFFAFF] rounded-full w-20 h-20 mx-auto mt-6 relative "> 
                  <i class="fa-solid fa-users text-[30px] absolute left-[30%] top-[30%]"></i>    
                </div>
                <div>
                  <h1 className="text-center font-bold text-black mt-6 text-xl"> User Friendly </h1>
                  <h2 className="w-[199px] h-[48px] text-[#999999] text-[13px] mx-auto mt-6 text-center"> 
                     Easy to use for people who are either new or professional 
                  </h2> 
                </div>
            </div>

            <div className=" bg-white w-72 h-60 rounded-lg">
                <div className="bg-[#EFFAFF] rounded-full w-20 h-20 mx-auto mt-6 relative"> 
                <i class="fa-regular fa-circle-check text-[30px] absolute left-[30%] top-[30%]"></i>
                </div>
                <div>
                  <h1 className="text-center font-bold text-black mt-6 text-xl"> Trusted App </h1>
                  <h2 className="w-[199px] h-[48px] text-[#999999] text-[13px] mx-auto mt-6 text-center"> 
                    Official application that is trusted for security
                  </h2> 
                </div>
            </div>

            <div className=" bg-white w-72 h-60 rounded-lg">
              <div className="bg-[#EFFAFF] rounded-full w-20 h-20 mx-auto mt-6 relative"> 
              <i class="fa-solid fa-award text-[30px] absolute left-[35%] top-[30%]  "></i>
                  </div>
             <div>
              <h1 className="text-center font-bold text-black mt-6 text-xl">
                World Award
              </h1>
              <h2 className="w-[199px] h-[48px] text-[#999999] text-[12px] mx-auto mt-6 text-center"> 
                This application get world award and completely free charges
              </h2> 
              </div>
           </div>
       </div>
      </div>  
    <div className="mx-32 mt-[104px]">
     <div className=" flex h-[540px] w-full bg-white justify-around ">
        <div className="flex-[65%]">
          <img 
          src= { backgroundChart} alt = " background_Chart" className="max-w-[26rem] h-[26rem] object-fill"
          />
        </div>
 
        <div className="flex-[35%]">
          <h5 className="text-main_color text-[18px] font-semibold mb-2">
             Superiority 
          </h5>
          <div className=" max-w-[360px] max-h-[112px]">
           <h2 className="text-[39px] font-bold text-black mb-4">
              Smart System And Friendly Interface
           </h2>
           <h5 className="text-[#999999] text-[14px] mb-8">
             Tasking is very easy to use, besides that it also has 
             many excellent features that other task manager app
             don’t have, so task manager can be done easily
           </h5>

           <button 
            className="bg-main_color text-white hover:opacity-80 rounded-lg px-8 py-4">
            Learn More
          </button>
          </div>
          
        </div>
    </div>
  </div>
  
  <div className=" h-[786px] w-full bg-[#F0F0F0] ">
    <div className="text-center pt-12 ">
      <h4 className="text-main_color font-medium text-xl mb-3"> Articles </h4>
      <span className=" text-black font-bold text-4xl"> Articles From </span>
      <span className="text-main_color font-bold text-4xl"> PROMAN </span>
    </div>

    <div className="grid grid-cols-3  gap-12 max-w-7xl  mt-16 mx-[120px]">
    { data.map (item => (
        
      <Card item ={item} key ={item.id}/>
    ))
   } 
    </div>
    <div className="flex justify-center mt-12">  
     <button 
      className="bg-main_color text-white hover:opacity-80 px-5 py-4 rounded-lg text-sm"> 
      Read More
     </button>
    </div>
  </div>
  
   <div className="mt-32 mx-[120px]"> 
   <div className="flex h-[540px] w-full bg-white justify-around ">
    <div className=" w-[50%]">
      <h3 className="text-main_color text-[18px] font-medium"> How It Works </h3>
      <h2 className=" text-black text-[48px] ">
       How Manage Your Work? We Have Option For You
      </h2>
      <h4 className="text-[14px] text-[#999999] max-w-[360px] max-h-[72px]">
      If you ever find anything hard, we got 3 option for you! 10+ Readable Documents, 
      Tutorial Videos that you are can access anywhere, and 24/7 Customer Service
      </h4>

      <button className="text-white bg-main_color px-4 py-4 rounded-lg mt-[32px]">
        Learn More
      </button>
    </div>

    <div className="w-[50%]">
      <div className="absolute">
      <img src = {backgroundChart } alt =" background_chart" className="max-w-[28rem] h-[28rem] object-fill " />
      </div>
      <div className="relative w-[194px] max-h-[204px] flex">
      <img src= { chart_3} alt = "chart" className=""/>
     
    
      </div>

      <div className="relative w-[194px] max-h-[204px] flex justify-center">
      <div className="relative">
      <img src ={chart_1} alt= " chart " className=" ml-45"></img>
      </div>
        
       </div>
    
     </div>
    </div>
   </div>
  

   <div className="h-[304px] bg-main_color">
    <img src= {footer} className ="w-full absolute"/>
    <div className="relative flex justify-around"> 
     <div className="w-[684px] h-[144px] my-[105px]"> 
     <h3 className="text-white text-5xl ">Build Your System of Project</h3>
     <h3 className="text-white text-5xl mt-5"> Management With PROMAN ?</h3>
 
     </div>
      <div className="mt-[125px]">
      <button 
      className="text-main_color bg-white px-5 py-4 rounded-lg hover:bg-zinc-200">
      Learn More
     </button>
      </div>
    </div>
   </div>

    <Footer></Footer>



    
 </div>
    );
  }
  
  export default Landing_page;