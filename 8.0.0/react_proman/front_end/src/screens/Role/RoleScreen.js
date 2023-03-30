import React from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
import Search from "../../components/Search/Search";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar from "../../data/image/avatar.jpg";

const RoleScreen = () => {
  //   const data = [
  //     {
  //       id: 1,
  //       roleName: "Admin",
  //       displayName: "Admin",
  //     },
  //     {
  //       id: 2,
  //       roleName: "BasicUser",
  //       displayName: "BasicUser",
  //     },
  //     {
  //       id: 3,
  //       roleName: "HR",
  //       displayName: "HR",
  //     },
  //   ];

  const options = ["View", "Edit", "Delete"];

  return (
    <div className="flex">
      <Sidebar />

      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <Breadcrumb pagename1= "Admin" pagename2= "Role"/>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          {/* <Header /> */}
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
          </div>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-4">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-4">
                  Role Name
                </th>

                <th scope="col" class="pl-12 py-4 ">
                  Display Name
                </th>
                <th scope="col" class="px-6 py-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                >
                  Admin
                </th>
                <td class="pl-12 py-4 ">Admin</td>
                <td className="px-10 py-4 text-right">
                  <DropMenu options={options} />
                </td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                >
                  BasicUser
                </th>
                <td class="pl-12 py-4">BasicUser</td>
                <td className="px-10 py-4 text-right">
                  <DropMenu options={options} />
                </td>
              </tr>
              <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium whitespace-nowrap dark:text-white"
                >
                  HR
                </th>
                <td class="pl-12 py-4">HR</td>
                <td className="px-10 py-4 text-right">
                  <DropMenu options={options} />
                </td>
              </tr>
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default RoleScreen;
