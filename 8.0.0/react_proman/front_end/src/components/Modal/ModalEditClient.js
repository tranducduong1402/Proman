import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateClient } from "../../Redux/Actions/ClientAction";
import Loading from "../Loading/Loading";
import FormInput from "../FormInput/FormInput";

const ModalEditClient = ({ status, id, setStatus, setMenu }) => {
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
    emailAddress: null,
  });

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
    name: "Role Names",
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
  console.log(id, "ClientId: ");
  const getOneClient = async (id) => {
    const { data } = await axios.get(
      `https://localhost:44311/api/services/app/User/Get?Id=${id}`,
      config
    );
    const client = data.result;
    setValues({
      userName: client.userName,
      name: client.name,
      surname: client.surname,
      roleNames: client.roleNames,
      sex: client.sex,
      emailAddress: client.emailAddress,
    });
  };

  useEffect(() => {
    getOneClient(id);
  }, [id]);
  

  const dispatch = useDispatch();
  const clientUpdate = useSelector((state) => state.clientUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = clientUpdate;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateClient({
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
                        />
                        <FormInput
                          value={values[inputs[1].name]}
                          {...inputs[1]}
                          onChange={handleChange}
                        />
                        <FormInput
                          value={values[inputs[2].name]}
                          {...inputs[2]}
                          onChange={handleChange}
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
export default ModalEditClient;
