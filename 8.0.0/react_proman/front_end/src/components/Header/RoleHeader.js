import { useEffect, useRef, useState } from "react";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { ROLE_CREATE_RESET } from "../../Redux/Constants/RoleContants";
import { createRole } from "../../Redux/Actions/RoleAction";
import FormInput from "../FormInput/FormInput";

const RoleHeader = () => {
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
            placeholder: "RoleName",
            pattern: "^[A-Za-z0-9]{5,30}$",
            errorMessage: "name must be length from 5 to 30 characters",
            label: "roleName",
            required: true,
        },
        {
            id: 2,
            name: "displayName",
            type: "text",
            placeholder: "DisplayName",
            pattern: "^[A-Za-z0-9]{5,30}$",
            errorMessage: "displayName must be length from 5 to 30 characters",
            label: "displayName",
            required: true,
        },
        {
            id: 3,
            name: "description",
            type: "text",
            placeholder: "Description",
            errorMessage: "description must be length from 5 to 30 characters",
            label: "description",
            required: true,
        },
    ];

    //call api
    const [values, setValues] = useState({
        name: null,
        displayName: null,
        description: null,
    });
    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const handleChangeRole = (e) => {
        setValues({ ...values, [e.target.name]: [e.target.value] });
    };
    const dispatch = useDispatch();
    const adminCreate = useSelector((state) => state.adminCreate);
    const { loading, error, user } = adminCreate;
    useEffect(() => {
        if (user) {
            dispatch({ type: ROLE_CREATE_RESET });
            setValues({
                name: null,
                displayName: null,
                description: null,
            })
        }
    }, [dispatch]);
    const submitHandler = (e) => {
        e.preventDefault();
        console.log("AAA")
        dispatch(createRole(values));
    };



    return (
        <div className=" mb-7 mx-5 mt-8">
            <div className="flex justify-between">
                <div>
                    <Search />
                </div>
                <div className="">
                    <button
                        className="bg-main_color text-white hover:opacity-80 w-[118px] h-[50px] rounded-lg text-sm"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <i class="fa-solid fa-plus mr-2"></i>
                        Create new role
                    </button>
                </div>
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
                                Create new role{" "}
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
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
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
}

export default RoleHeader;