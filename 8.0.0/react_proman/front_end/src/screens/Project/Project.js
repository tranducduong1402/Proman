import React, { useRef, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar from "../../data/image/avatar.jpg";
const Project = () => {
  const data = [
    {
      projectName: 'EO 45: Equity Metrics Reporting',
      code: "8790",
      projectType: "Product",
      createBy: "admin",
      start: "2020/02/08",
      end: "2020/03/25",
      isActive: true,
    },
    {
      projectName: '2020 SIER Scoping and procurement',
      code: "4845",
      projectType: "Product",
      createBy: "admin",
      start: "2021/12/12",
      end: "2022/03/02",
      isActive: true,

    },
    {
      projectName: 'MODA communications Workshop',
      code: "1367",
      projectType: "Outsource",
      createBy: "Tinh",
      start: "2021/05/18",
      end: "2020/06/18",
      isActive: false,
    },
    
  ];

  const options = ["View", "Edit", "Delete"];

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
      <Breadcrumb pagename1= "Job" pagename2= "Project"/>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Header />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=" text-[13px] text-black font-bold">
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 font-bold text-black">
                  Project Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Create By
                </th>
                <th scope="col" className="px-6 py-3">
                  Start
                </th>
                <th scope="col" className="px-6 py-3">
                  End
                </th>
                <th scope="col" className="px-6 py-3">
                  IsActive
                </th>
                
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <input
                        id="checkbox-table-search-1"
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label for="checkbox-table-search-1" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <td className="px-6 py-4">{item.projectName}</td>
                  
                  <td className="px-6 py-4">{item.code}</td>
                  <td className="px-6 py-4">{item.projectType}</td>

                  <td className="px-6 py-4">{item.createBy}</td>
                  <td className="px-6 py-4">{item.start}</td>
                  <td className="px-6 py-4">{item.end}</td>
                  <td className="px-6 py-8">
                        {item.isActive ? (
                          <div className="flex items-center bg-[#0D9488] rounded-2xl w-[20px] h-[20px]">
                            <i className="fa-solid fa-check text-white rounded-xl w-[20px] h-[20px] text-center mt-1"></i>
                          </div>
                        ) : (
                          <div className="flex items-center bg-red-600 rounded-2xl w-[20px] h-[20px]">
                            <i className="fa-solid fa-xmark text-white rounded-xl w-[20px] h-[20px] text-center mt-[6px]"></i>
                          </div>
                        )}
                      </td>
                  
                  <td className="px-10 py-8">
                    <DropMenu options={options} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination />
        </div>
      </div>
    </div>
  );
};

export default Project;
