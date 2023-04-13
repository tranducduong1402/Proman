import React, { useRef, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar from "../../data/image/avatar.jpg";
const Position = () => {
  const data = [
    {
      id: '1',
      name: "dev",
      shortName: "dev",
      code: "dev",
    },
    
    {
      id: '2',
      name: "tester",
      shortName: "tester",
      code: "tester",
    },
    
    {
      id: '3',
      name: "BA",
      shortName: "BA",
      code: "BA",
    },
    
    
  ];

  const options = ["View", "Edit", "Delete"];

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
      <Breadcrumb pagename1= "Job" pagename2= "Position"/>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Header />
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=" text-[13px] text-black font-bold">
                
                <th scope="col" className="px-6 py-3 font-bold text-black">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Short Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Code
                </th>
                
                <th scope="col" className="px-6 py-3 text-center">
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
                  
                  <td className="px-6 py-4">{item.id}</td>
                  
                  <td className="px-6 py-4">{item.name}</td>
                  <td className="px-6 py-4">{item.shortName}</td>

                  <td className="px-6 py-4">{item.code}</td>
                  
                  
                  
                  <td className="px-10 py-8 text-center">
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

export default Position;
