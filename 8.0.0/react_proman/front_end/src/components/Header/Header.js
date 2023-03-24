import React, { useRef, useState } from 'react'
import FormInput from '../FormInput/FormInput'
import Search from '../Search/Search'
import SelectMenu from '../SelectedMenu/SelectMenu'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef(null);
  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
       setIsOpen(false);
    }
  };

const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "UserName",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "Username must be length from 5 to 30 characters",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "Email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email must be length from 5 to 30 characters",
      label: "Email",
      pattern: "^[A-Za-z0-9]{5,30}$",
      required: true,
    },
    {
        id: 3,
        name: "password",
        type: "password",
        placeholder: "Password",
        errorMessage: "Password must be length from 5 to 30 characters",
        label: "Password",
        pattern: "^[A-Za-z0-9]{5,30}$",
        required: true,
      },

      {
        id: 4,
        name: "fullName",
        type: "text",
        placeholder: "FullName",
        pattern: "^[A-Za-z0-9]{5,30}$",
        errorMessage: "FullName must be length from 5 to 30",
        label: "FullName",
      },
  ];
  const filter = [ 
    {
      title:'Position',
      default:'All',
      options: ['Dev', 'Tester', 'BA', 'Ux Ui']
    },
    {
      title: 'Level',
      default: 'All',
      options:['Intern', 'Staff', 'Fresher', 'Junior','PM']
    },
    {
      title: 'User Type',
      default: 'All',
      options:['Basic User', 'Admin', 'Super Admin']
    },
    {
      title: 'Active',
      default: 'All',
      options:['Active', 'DeActive']
    }
  ]

  const SelectInput1 = {
      title:'User Type',
      default:'Choose Value',
      options:['Basic User', 'Admin', 'Super Admin']
  }
  const SelectInput2 = [
    {
      title: 'Gender',
      default: 'Choose Value',
      options:['Male', 'FeMale']
    },
    {
      title: 'Level',
      default: 'Choose Value',
      options:['Intern', 'Staff', 'Fresher', 'Junior','PM']
    },
  ]

  

  return (
    <div className=' mb-7 mx-5 mt-8'>
      <div className='flex justify-between'>
        <div>
         <Search/>
        </div>
        <div className=''>
        <button 
         className="bg-main_color text-white hover:opacity-80 w-[118px] h-[50px] rounded-lg text-sm"
        onClick={() => setIsOpen(!isOpen)}
         > 
         <i class="fa-solid fa-plus mr-2"></i>
          Add User
        </button>
        </div>
        
      </div>
      <div className=' flex justify-between mt-7'>
       {
        filter.map((item) => (
          <div className='w-[230px]'>
          <SelectMenu props={item}/>
          </div>
           
        ))
       }
       
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81]"
          onClick={handleClose}
        >
          <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg " ref= { modalRef }>
            <div className='w-[820px] h-[500px]'>
             <h2 className='text-[18px] text-black font-bold mb-5 '> Add new user </h2>
              <div className='flex justify-around' >
               <div className=' w-[320px]'>
                 <FormInput {...inputs[0]}/>
                 <FormInput {...inputs[1]}/>
                 <SelectMenu props={SelectInput1}/>
                 <FormInput {...inputs[2]}/>
               </div>
                <div className=' w-[320px]'>
                  <FormInput {...inputs[3]}/>
                  {
                    SelectInput2.map((item) => (
                        <SelectMenu props={item}/>
                    ))
                  }
                </div>
              </div>
            <div className=' flex justify-end mr-5 mt-20'>
             <button className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
              onClick={() => setIsOpen(!isOpen)}
             >
              Cancel
              </button>
             <button className="text-white bg-main_color px-5 py-2 rounded-lg  text-[15px] hover:opacity-90">
              Save 
             </button>
            </div>  
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
