import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_RESET } from "../../Redux/Constants/UserContants";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import { editUser, updateUser } from "../../Redux/Actions/UserAction";
import Loading from "../Loading/Loading";
import axios from "axios";

const ModalEditProject = ({ status, id, setStatus, setMenu, disable }) => {
  const [isOpen, setIsOpen] = useState(status);
  const modalRef = useRef(null);
  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const [values, setValues] = useState({
    name: null,
    timeStart: null,
    timeEnd: '',
    projectType: null,
    code: null,
    status: null,
  });

  const inputs = [
    {
        id: 1,
        name: "name",
        type: "text",
        placeholder: "Name",
        pattern: "^[A-Za-z0-9]{3,30}$",
        errorMessage: "name must be length from 3 to 30 characters",
        label: "Name",
        required: true,
    },
    {
      id: 2,
      name: "projectType",
      type: "text",
      placeholder: "Project Type",
      pattern: "^[A-Za-z0-9]{3,30}$",
      errorMessage: "Project Type must be length from 3 to 30 characters",
      label: "Project Type",
      required: true,
    },
    {
      id: 3,
      name: "code",
      type: "text",
      placeholder: "code",
      errorMessage: "Email must be length from 5 to 30 characters",
      label: "Code",
      required: true,
    },
    {
      id: 5,
      name: "timeStart",
      type: "date",
      placeholder: "Time Start",
      label: "Time Start",
    },
    {
        id: 5,
        name: "timeEnd",
        type: "date",
        placeholder: "Time End",
        label: "Time End",
      },
  ];


  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  // call api get one project
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
        name: null,
        timeStart: null,
        timeEnd: '',
        projectType: null,
        code: null,
        status: null,
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
                        <FormInput
                          value={values[inputs[4].name]}
                          {...inputs[4]}
                          onChange={handleChange}
                          status={disable}
                        />
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
export default ModalEditProject;
