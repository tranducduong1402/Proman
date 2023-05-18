import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Sidebar from "../../components/Sidebar/Sidebar";
import { listRole } from "../../Redux/Actions/RoleAction";
import RoleHeader from "../../components/Header/RoleHeader";
import Loading from "../../components/Loading/Loading";

const RoleScreen = () => {
  const dispatch = useDispatch();
  const roleList = useSelector((state) => state.roleList);

  const { error, loading, roles } = roleList;

  useEffect(() => {
    dispatch(listRole());
  }, [dispatch]);

  const options = ["View", "Edit", "Delete"];

  return (
    <div className="flex">
      <Sidebar />

      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <Breadcrumb pagename1="Admin" pagename2="Role" />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <RoleHeader />
           <div className="flex justify-between">
            <div>
              <Search/>
            </div>
            <div className="">
              <button
                className="bg-main_color text-white hover:opacity-80 w-[148px] h-[50px] rounded-lg text-sm"
                // onClick={() => setIsOpen(!isOpen)}
              >
                <i class="fa-solid fa-plus mr-2"></i>
                Create new role
              </button>
            </div>
          </div> */}
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Role Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Display Name
                </th>
                <th scope="col" class="px-6 py-3">
                  description
                </th>
                <th scope="col" class="px-6 py-3 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
               <Loading/>
              ) : (
                <React.Fragment>
                  {roles.map((item, index) => (
                    <tr
                      key={item.id}
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                      >
                        {item.name}
                      </th>
                      <td class="pl-12 py-4 ">{item.displayName}</td>
                      <td class="pl-12 py-4 ">{item.description}</td>
                      <td className="px-10 py-4 text-right">
                        <DropMenu options={options} />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default RoleScreen;
