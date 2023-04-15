import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Dropdown = ( { data }) => {
  return (
    <div>
    <div className={`${ data.status && "hidden" }  text-black  ${ !data.statusNav && "hidden" }` }>

    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 align-middle">
      <li >    
      <Link to='/user'>
      <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
      <span className='text-[20px] pr-5'> - </span>
       { data.children1}</h2>
      </Link> 
      </li>
      <li>
       <Link to='/role'>
        <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
         <span className='text-[20px] pr-5'> - </span>
           { data.children2}</h2>
       </Link>      
       </li>
      <li>
       <Link to='/client'>
         <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
         <span className='text-[20px] pr-5'> - </span>
          { data.children3}</h2>
       </Link> 
      </li>
      <li>
       <Link to='/position'>
         <h2 className="block px-4 py-2 hover:text-main_color font-semibold "> 
         <span className='text-[20px] pr-5'> - </span>
          { data.children4}</h2>
      </Link> 
      </li>
    </ul>
   </div>

    </div>
  )
}

export default Dropdown
