import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "../Search/Search";
import SelectFilter from "../SelectedMenu/SelectFilter";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import { CREATE_CLIENT_RESET } from "../../Redux/Constants/ClientContants";
import { createClient } from "../../Redux/Actions/ClientAction";

const HeaderClient = ({ name, sendDataToParent }) => {
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
      name: "userName",
      type: "text",
      placeholder: "ClientName",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "Clientname must be length from 5 to 30 characters",
      label: "clientName",
      required: true,
    },
    {
      id: 2,
      name: "name",
      type: "text",
      placeholder: "Name",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "Name must be length from 5 to 30 characters",
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
      name: "Gender",
      title: "sex",
      default: "All",
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
      name: "Active",
      title: "isActive",
      default: "All",
      options: [
        {
          name: "Active",
          value: true,
        },
        {
          name: "DeActive",
          value: false,
        },
      ],
    },
  ];

  const SelectInput1 = {
    name: "RoleNames",
    title: "roleNames",
    default: "Choose Value",
    options: [
      {
        name: "Client",
        value: "Client",
      }
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
  ];

  //call api
  const [values, setValues] = useState({
    userName: null,
    name: null,
    surname: null,
    roleNames: [],
    sex: null,
    type: null,
    password: null,
    emailAddress: null,
  });

  const [valueFilter, setValueFilter] = useState({
    sex: null,
    isActive: null,
    type: null,
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleFilter = async (e) => {
    setValueFilter({ ...valueFilter, [e.target.name]: e.target.value });
    if (e.target.value === "All")
      sendDataToParent((prev) =>
        Object.keys(prev)
          .filter((key) => key.includes(!e.target.name))
          .reduce((obj, key) => {
            obj[key] = prev[key];
            return obj;
          }, {})
      );
    else
      sendDataToParent((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const handleChangeRole = (e) => {
    setValues({ ...values, [e.target.name]: [e.target.value] });
  };

  const dispatch = useDispatch();
  const adminCreate = useSelector((state) => state.adminCreate);
  const { loading, error, client } = adminCreate;

  useEffect(() => {
    if (client) {
      dispatch({ type: CREATE_CLIENT_RESET });
      setValues({
        userName: null,
        name: null,
        surname: null,
        roleNames: [],
        sex: null,
        type: null,
        password: null,
        emailAddress: null,
      });
    }
  }, [dispatch]);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(createClient(values));
    setIsOpen(!isOpen);
  };

  return (
    <div className=" mb-7 mx-5 mt-8">
      <div className="flex justify-between">
        <div>
          <Search namesearch={name} />
        </div>
        <div className="">
          <button
            className="bg-main_color text-white hover:opacity-80 w-[118px] h-[50px] rounded-lg text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i class="fa-solid fa-plus mr-2"></i>
            Add Client
          </button>
        </div>
      </div>
      <div className=" flex justify-between mt-7">
        {filter.map((item) => (
          <div className="w-[230px]">
            <SelectFilter
              props={item}
              key={item.id}
              onChange={handleFilter}
              value={values[item.title]}
            />
          </div>
        ))}
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81]"
          onClick={handleClose}
        >
          <div
            className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg "
            ref={modalRef}
          >
            <div className="w-[820px] h-[500px]">
              <h2 className="text-[18px] text-black font-bold mb-5 ">
                Add new client
              </h2>
              <form onSubmit={submitHandler}>
                <div className="flex justify-around">
                  <div className="w-[320px]">
                    <FormInput
                      key={inputs[0].id}
                      {...inputs[0]}
                      value={values[inputs.name]}
                      onChange={handleChange}
                    />
                    <FormInput
                      key={inputs[1].id}
                      {...inputs[1]}
                      value={values[inputs.name]}
                      onChange={handleChange}
                    />
                    <SelectMenu
                      props={SelectInput1}
                      onChange={handleChangeRole}
                    />
                    <FormInput
                      key={inputs[2].id}
                      {...inputs[2]}
                      value={values[inputs.name]}
                      onChange={handleChange}
                    />
                  </div>
                  <div className=" w-[320px]">
                    <FormInput
                      key={inputs[4].id}
                      {...inputs[4]}
                      value={values[inputs.name]}
                      onChange={handleChange}
                    />
                    <FormInput
                      key={inputs[3].id}
                      {...inputs[3]}
                      value={values[inputs.name]}
                      onChange={handleChange}
                    />
                    {SelectInput2.map((item) => (
                      <SelectMenu
                        props={item}
                        onChange={handleChange}
                        value={values[item.title]}
                      />
                    ))}
                  </div>
                </div>
                <div className=" flex justify-end mr-5 mt-20">
                  <button
                    className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
                    onClick={() => setIsOpen(!isOpen)}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-white bg-main_color px-5 py-2 rounded-lg  text-[15px] hover:opacity-90"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderClient;
