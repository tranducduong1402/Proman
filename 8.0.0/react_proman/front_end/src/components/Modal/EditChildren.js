import React from 'react'
import FormInput from '../FormInput/FormInput';
import SelectMenu from '../SelectedMenu/SelectMenu';

const EditChildren = ({props}) => {
  const inputs = [
    {
      id: 1,
      name: "userName",
      type: "text",
      placeholder: "UserName",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "Username must be length from 5 to 30 characters",
      label: "userName",
      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Name",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "Username must be length from 5 to 30 characters",
      label: "Name",
      required: true,
    },
    {
      id: 3,
      name: "emailAddress",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email must be length from 5 to 30 characters",
      label: "Email",
      required: true,
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password must be length from 5 to 30 characters",
      label: "Password",
      pattern: "^[A-Za-z0-9]{5,30}$",
      required: true,
    },

    {
      id: 5,
      name: "surname",
      type: "text",
      placeholder: "Full Name",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "FullName must be length from 5 to 30",
      label: "Full Name",
    },
  ];
  const filter = [
    {
      title: "Position",
      default: "All",
      options: ["Dev", "Tester", "BA", "Ux Ui"],
    },
    {
      title: "Level",
      default: "All",
      options: ["Intern", "Staff", "Fresher", "Junior", "PM"],
    },
    {
      title: "User Type",
      default: "All",
      options: ["Basic User", "Admin", "Super Admin"],
    },
    {
      title: "Active",
      default: "All",
      options: ["Active", "DeActive"],
    },
  ];

  const SelectInput1 = {
    name: "Type",
    title: "roleNames",
    default: "Choose Value",
    options: [
      {
        name: "Basic User",
        value: "Basic User",
      },
      {
        name: "Admin",
        value: "Admin",
      },
    ],
  };
  const SelectInput2 = [
    {
      name: "Gender",
      title: "sex",
      default: "Choose Value",
      options: [
        {
          name: "Male",
          value: 0,
        },
        {
          name: "FeMale",
          value: 1,
        },
      ],
    },
    {
      name: "Level",
      title: "level",
      default: "Choose Value",
      options: [
        {
          value: 1,
          name: "Intern",
        },
        {
          value: 0,
          name: "Staff",
        },
        {
          value: 2,
          name: "Collaborators",
        },
        {
          value: 3,
          name: "ProbationaryStaff ",
        },
      ],
    },
  ];

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
