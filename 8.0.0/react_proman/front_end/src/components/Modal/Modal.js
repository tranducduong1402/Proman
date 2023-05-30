import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import { editUser, updateUser } from "../../Redux/Actions/UserAction";
import Loading from "../Loading/Loading";
import axios from "axios";

const Modal = ({ status, id, setStatus, setMenu, disable }) => {
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
    positionId: '',
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

  //get position
  const positionList = useSelector((state) => state.positionList);
  const {
    error: errorPosition,
    loading: loadingPosition,
    positions,
  } = positionList;

  const list = positions?.map((position, index) => ({
    value: position.id,
    name: position.name,
  }));

  const SelectInput1 = {
    name: "Positions",
    title: "positionId",
    default: "Choose Value",
    options: list,
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
      name: "Type",
      title: "type",
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

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // call api get one user
  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;
  const config = {
    headers: { Authorization: `Bearer ${userInfo.result.accessToken}` },
  };

  const [results, setResult] = useState("");
  const getOneUser = async (id) => {
    const { data } = await axios.get(
      `https://localhost:44311/api/services/app/User/Get?Id=${id}`,
      config
    );
    const user = data.result;
    setValues({
      userName: user.userName,
      name: user.name,
      surname: user.surname,
      positionId: user.positionId,
      sex: user.sex,
      type: user.type,
      emailAddress: user.emailAddress,
    });
  };

  useEffect(() => {
    getOneUser(id);
  }, [id]);

  const dispatch = useDispatch();
  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id,
        ...values,
      })
    );
  };
  console.log("day la value edit user", values)

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81] z-[999]"
          onClick={handleClose}
        >
          <form onSubmit={submitHandler}>
            <div
              className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg "
              ref={modalRef}
            >
              {loadingUpdate ? (
                <Loading />
              ) : (
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
                          status={disable}
                        />
                        <FormInput
                          value={values[inputs[1].name]}
                          {...inputs[1]}
                          onChange={handleChange}
                          status={disable}
                        />
                        <SelectMenu
                          props={SelectInput1}
                          value={values["positionId"]}
                          onChange={handleChange}
                          status={disable}
                        />
                        <FormInput
                          value={values[inputs[2].name]}
                          {...inputs[2]}
                          onChange={handleChange}
                          status={disable}
                        />
                      </div>
                      <div className=" w-[320px]">
                        <FormInput
                          value={values[inputs[3].name]}
                          {...inputs[3]}
                          onChange={handleChange}
                          status={disable}
                        />
                        {SelectInput2.map((item) => (
                          <SelectMenu
                            key={item.id}
                            props={item}
                            value={values[item.title]}
                            onChange={handleChange}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-end mr-5 mt-20">
                    <button
                      className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
                      onClick={() => {
                        setIsOpen(!isOpen);
                        setStatus(false);
                        setMenu(false);
                      }}
                    >
                      Cancel
                    </button>
                    <button className="text-white bg-main_color px-5 py-2 rounded-lg  text-[15px] hover:opacity-90">
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
export default Modal;
