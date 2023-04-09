import React, { useEffect, useState } from "react";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import { useDispatch, useSelector } from "react-redux";
import { editUser } from "../../Redux/Actions/UserAction";

const EditChildren = ({ props, id }) => {
  const [values, setValues] = useState({
    userName: null,
    name: null,
    surname: null,
    roleNames: [],
    sex: null,
    level: null,
    emailAddress: null,
  });

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
      id: 5,
      name: "surname",
      type: "text",
      placeholder: "Full Name",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "FullName must be length from 5 to 30",
      label: "Full Name",
    },
  ]
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

  const dispatch = useDispatch();
  const userEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = userEdit;

  // const userUpdate = useSelector((state) => state.productUpdate);
  // const {
  //   loading: loadingUpdate,
  //   error: errorUpdate,
  //   success: successUpdate,
  // } =userUpdate;

  useEffect(() => {
      dispatch(editUser(id));
    setValues({ 
      userName: user.userName,
      name: user.name,
      surname: user.surname,
      roleNames: user.roleNames ,
      sex: user.sex,
      level: user.level,
      emailAddress: user.emailAddress
       });
  }, [dispatch, id]);
 console.log(values)
  return (
    <div>
      <h2 className="text-[18px] text-black font-bold mb-5 "> {props.title}</h2>
      <div className="flex justify-around">
        <div className=" w-[320px]">
          <FormInput value={values[inputs[0].name]} {...inputs[0]} />
          <FormInput value={values[inputs[1].name]} {...inputs[1]} />
          <SelectMenu props={SelectInput1} value={values['roleNames']} />
          <FormInput value={values[inputs[2].name]} {...inputs[2]} />
        </div>
        <div className=" w-[320px]">
          <FormInput value={values[inputs[3].name]} {...inputs[3]} />
          {SelectInput2.map((item) => (
            <SelectMenu props={item}  value={values[item.title]} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditChildren;
