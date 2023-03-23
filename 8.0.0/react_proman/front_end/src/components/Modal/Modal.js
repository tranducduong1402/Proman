import React, { useRef, useState }  from "react";
import EditChildren from "./EditChildren";

const Modal = ({ status }) => {
  const [isOpen, setIsOpen] = useState(status);
  const modalRef = useRef(null);
  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
       setIsOpen(false);
    }
  };

    return (
      <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81]"
          onClick={handleClose}
        >
          <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg " ref= { modalRef }>
            <div className='w-[820px] h-[500px]'>
              <EditChildren props={'Edit'} />
            <div className=' flex justify-end mr-5 mt-20'>
             <button className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
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
        </div>
      )}
      </div>
    )
   }
export default Modal;
