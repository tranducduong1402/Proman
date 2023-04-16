import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import { editUser, updateUser } from "../../Redux/Actions/UserAction";

const Modal = ({ status, id }) => {
  const [isOpen, setIsOpen] = useState(status);
  const modalRef = useRef(null);
  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

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

  const dispatch = useDispatch();
  const userEdit = useSelector((state) => state.userEdit);
  const { loading, error, user } = userEdit;
  
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
    }
    dispatch(editUser(id));

    setValues({
      userName: user.userName,
      name: user.name,
      surname: user.surname,
      roleNames: user.roleNames,
      sex: user.sex,
      level: user.level,
      emailAddress: user.emailAddress,
    });
  }, [dispatch, id]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id,
        ...values,
      })
    );
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81]"
          onClick={handleClose}
        >
          <form onSubmit={submitHandler}>
            <div
              className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg "
              ref={modalRef}
            >
              <div className="w-[820px] h-[500px]">
                <div>
                  <h2 className="text-[18px] text-black font-bold mb-5 ">
                    Edit
                  </h2>
                  <div className="flex justify-around">
                    <div className=" w-[320px]">
                      <FormInput
                        value={values[inputs[0].name]}
                        {...inputs[0]}
                        onChange={handleChange}
                      />
                      <FormInput
                        value={values[inputs[1].name]}
                        {...inputs[1]}
                        onChange={handleChange}
                      />
                      <SelectMenu
                        props={SelectInput1}
                        value={values["roleNames"]}
                      />
                      <FormInput
                        value={values[inputs[2].name]}
                        {...inputs[2]}
                        onChange={handleChange}
                      />
                    </div>
                    <div className=" w-[320px]">
                      <FormInput
                        value={values[inputs[3].name]}
                        {...inputs[3]}
                        onChange={handleChange}
                      />
                      {SelectInput2.map((item) => (
                        <SelectMenu 
                        props={item} 
                        value={values[item.title]}  
                        onChange={handleChange} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className=" flex justify-end mr-5 mt-20">
                  <button
                    className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
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
          </form>
        </div>
      )}
    </div>
  );
};
export default Modal;
