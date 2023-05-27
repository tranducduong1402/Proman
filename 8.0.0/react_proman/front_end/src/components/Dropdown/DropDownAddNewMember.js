import React, { useState } from "react";
import { listUser } from "../../Redux/Actions/UserAction";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const DropDownAddNewMember = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const handleChange = (value) => {
    const keyword = value
    dispatch(listUser(keyword));
  };

  return (
    <div>
      <div class="relative inline-block text-left">
        <div>
          <button type="button" onClick={() => setOpen(!open)}>
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>

        {open ? (
          <div class="absolute right-0 mt-2 w-[169px] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="" >
              <div className="text-[#334155] cursor-pointer mt-2 h-full ">
                <div className="rounded-sm flex  hover:bg-main_color h-[38px] hover:text-white w-full">
                  <input
                    type="text"
                    id="simple-search"
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search"
                    required
                    onChange={(e) => handleChange(e.target.value)}
                  />
                </div>
                {users ? users.map(item => (<div className="ml-2 mb-[3px]"> {item.userName}</div>)): null}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default DropDownAddNewMember;
