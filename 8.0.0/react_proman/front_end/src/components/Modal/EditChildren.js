import React from 'react'
import FormInput from '../FormInput/FormInput';
import SelectMenu from '../SelectedMenu/SelectMenu';

const EditChildren = ({props}) => {
  console.log(props)
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

    const SelectInput1 = {
        title:'User Type',
        default:'Choose Value',
        options:['Basic User', 'Admin', 'Super Admin']
    }

    const SelectInput2 = 
    [
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
    <div> 
    <h2 className='text-[18px] text-black font-bold mb-5 '> { props.title }</h2>
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
    </div>
  )
}

export default EditChildren
