import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../Redux/Actions/UserAction';
import { deletePosition } from '../../Redux/Actions/PositionAction';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteClient } from '../../Redux/Actions/ClientAction';

const Confirm = ({ confirm, id, name }) => {
  const [isOpen, setIsOpen] = useState(confirm);
  const modalRef = useRef(null);

  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const positionDelete = useSelector((state) => state.positionDelete);
  const { error: errorDelete, success: successDelete } = positionDelete;
  const dispatch = useDispatch();
  
  const deleteHandler = (id) => {
    if (name === "user") {
      dispatch(deleteUser(id))
    }

    if (name === "position") {
      dispatch(deletePosition(id))   
    }

    if (name === "client") {
      dispatch(deleteClient(id))
    }
    
  };
  if(successDelete){
    toast.success("delete success")
  }
  
  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81] z-[400]"
          onClick={handleClose}
        >
          <div className="bg-[#FFFFFF] p-8 rounded-lg shadow-lg " ref={modalRef}>
            <div className='w-[300px] h-[120px]'>
              Delete Item
              <div className='mt-5 font-bold'> Are you sure you want to delete?</div>
              <div className=' flex justify-end mr-5 mt-10'>
                <button className="text-black bg-[#EEEFF3] px-2 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  Cancel
                </button>
                <button
                  className="text-white bg-red-500 px-5 py-2 rounded-lg  text-[15px] hover:opacity-90"
                  onClick={() => deleteHandler(id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      </div>
    )
      }

export default Confirm
