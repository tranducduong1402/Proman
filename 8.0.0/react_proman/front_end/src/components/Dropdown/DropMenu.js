import React, {useState } from 'react'
import Modal from '../Modal/Modal'

const DropMenu = ({options}) => {
    const [open, setOpen] = useState(false)
    const [status,setStatus] = useState(false)
  
  return (
    <div >  
   
        <div class="relative inline-block text-left">
        <div>
          <button 
          type="button"
          onClick={ () => setOpen( !open )}
          >
          <i class="fa-solid fa-bars"></i>
          </button>
        </div>
       
         {
            open ? (
                <div class="absolute right-0  h-[139px] mt-2 w-[169px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" 
               
                > 
                <div class=" " >
                  {
                    options && (
                        <div className='text-[#334155] cursor-pointer mt-2' >
                        <div className='rounded-sm flex  hover:bg-main_color h-[38px] hover:text-white'
                        onClick={() => setStatus(!status)}> 
                         <i class= 'fa-solid fa-eye mt-3 mx-3' ></i>
                         <button className='text-[16px]  '>
                           View Detail
                          </button>
                        </div>
                        <div className='rounded-sm flex  hover:bg-main_color h-[38px] hover:text-white'
                          onClick={() => setStatus(!status)}
                        >
                          <i class= 'fa-solid fa-pen-to-square mt-3 mx-3'></i>
                          <button className='text-[16px]'>
                            Edit
                          </button>
                        </div>
                        <div className='rounded-sm flex  hover:bg-main_color h-[38px] hover:text-white'>
                        <i class= 'fa-solid fa-trash mt-3 mx-3'></i>
                        <button className='text-[16px] '>
                          Delete
                        </button>
                        </div>  
                          
                        </div>
                    )
                  }
               
                  </div>
              </div>
            ): null
         }
        
       </div>
       { status && <Modal status={ status }/> }
     
       </div>
    )
        } 
  
   

  

export default DropMenu
