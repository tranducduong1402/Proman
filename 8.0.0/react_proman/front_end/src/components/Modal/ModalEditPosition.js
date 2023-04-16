import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { POSITION_UPDATE_RESET } from "../../Redux/Constants/PositionContants";
import { detailPosition, updatePosition } from "../../Redux/Actions/PositionAction";
import FormInput from "../FormInput/FormInput";

const ModalEditPosition = ({ status, id }) => {
    const [isOpen, setIsOpen] = useState(status);
    const modalRef = useRef(null);
    const handleClose = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const [values, setValues] = useState({
        name: null,
        shortName: null,
        code: null,
        color: null,
    });

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
            required: true,
        },
    ];

    const dispatch = useDispatch();
    const positionDetail = useSelector((state) => state.positionDetail);
    const { loading, error, position } = positionDetail;

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };
    const positionUpdate = useSelector((state) => state.positionUpdate);

    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = positionUpdate;

    useEffect(() => {
        if (successUpdate) {
            dispatch({ type: POSITION_UPDATE_RESET });
        }
        dispatch(detailPosition(id));
        setValues({
            name: position.name,
            shortName: position.shortName,
            code: position.code,
            color: position.color,
        });
    }, [dispatch, id]);
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updatePosition({
                id,
                ...values,
            })
        ); setIsOpen(!isOpen)
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
                                            <FormInput
                                                value={values[inputs[2].name]}
                                                {...inputs[2]}
                                                onChange={handleChange}
                                            />
                                            <FormInput
                                                value={values[inputs[3].name]}
                                                {...inputs[3]}
                                                onChange={handleChange}
                                            />
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
export default ModalEditPosition;
