import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search/Search";
import FormInput from "../FormInput/FormInput";
import { POSITION_CREATE_RESET } from "../../Redux/Constants/PositionContants";
import { createPosition } from "../../Redux/Actions/PositionAction";

const PositionHeader = ({name}) => {
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
        name: "name",
        type: "text",
        placeholder: "name",
        pattern: "^[A-Za-z0-9]{1,30}$",
        errorMessage: "Required!",
        label: "Name",
        required: true,
      },
      {
        id: 2,
        name: "shortName",
        type: "text",
        placeholder: "shortName",
        pattern: "^[A-Za-z0-9]{1,30}$",
        errorMessage: "Required!",
        label: "ShortName",
        required: true,
      },
      {
        id: 3,
        name: "code",
        type: "text",
        placeholder: "code",
        pattern: "^[A-Za-z0-9]{1,30}$",
        errorMessage: "Required!",
        label: "Code",
        required: true,
      },
      {
        id: 4,
        name: "color",
        type: "color",
        placeholder: "color",
        errorMessage: "Required!",
        label: "Color",
        pattern: "^[A-Za-z0-9]{4,30}$",
        required: true,
      },
    ];
  
    //call api
    const [values, setValues] = useState({
      name: null,
      shortName: null,
      code: null,
      color: null,
    });
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
    };
    const dispatch = useDispatch();
    const positionCreate = useSelector((state) => state.positionCreate);
    const { loading, error, position } = positionCreate;
    
    console.log("value", values);
    useEffect(() => {
      if (position) {
        dispatch({ type: POSITION_CREATE_RESET });
      setValues({
        name: null,
        shortName: null,
        code: null,
        color: null,
        })
      }
    }, [ dispatch]);
    const submitHandler = (e) => {
      e.preventDefault();
      dispatch(createPosition(values));
      setIsOpen(!isOpen)
    };
  
    return (
      <div className=" mb-7 mx-5 mt-8">
        <div className="flex justify-between">
          <div>
            <Search namesearch={name}/>
          </div>
          <div className="">
            <button
              className="bg-main_color text-white hover:opacity-80 w-[118px] h-[50px] rounded-lg text-sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              <i class="fa-solid fa-plus mr-2"></i>
              Add Position
            </button>
          </div>
        </div>
        <div className=" flex justify-between mt-7">
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
                    {" "}
                    Add new position{" "}
                  </h2>
                <form onSubmit={submitHandler}>
                  <div className="flex justify-around">
                    <div className=" w-[320px]">
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
                      <FormInput
                        key={inputs[2].id}
                        {...inputs[2]}
                       value={values[inputs.name]}
                        onChange={handleChange}
                      />
                      <FormInput
                        key={inputs[3].id}
                        {...inputs[3]}
                       value={values[inputs.name]}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className=" flex justify-end mr-5 mt-20">
                    <button
                      className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
                      onClick={() => setIsOpen(!isOpen)}
  
                    >
                      Cancel
                    </button>
                     <button className="text-white bg-main_color px-5 py-2 rounded-lg  text-[15px] hover:opacity-90"
  
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
  
  export default PositionHeader;