import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropMenu from "../../components/Dropdown/DropMenu";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar from "../../data/image/avatar.jpg";
import { listUser } from "../../Redux/Actions/UserAction";
const UserScreen = () => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);

  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);

  const userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null;

  const config = {
    headers: {
      Authorization: `Bearer ${userInfo.result.accessToken}`,
    },
  };
 /* fetching Data */
 const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch("http://localhost:4000/api/products");
    const jsonData = await response.json();
    setResult(jsonData);
    return jsonData;
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchData();
}, []);
  const data = [
    {
      id: 1,
      name: "Dương Đỗ",
      email: "DuongnoDo@example.com",
      position: "dev",
      type: " staff",
      project: " Proman ",
      sex: "Male",
      roles: "admin",
    },
    {
      id: 2,
      name: "John Doe",
      email: "johndoe@example.com",
      position: "dev",
      type: " staff",
      project: " Proman ",
      sex: "Male",
      roles: "admin",
    },
    {
      id: 3,
      name: "John Doe",
      email: "johndoe@example.com",
      position: "dev",
      type: " staff",
      project: " Proman ",
      sex: "Male",
      roles: "admin",
    },
  ];
  const options = ["View", "Edit", "Delete"];
console.log(result.result)
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
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
                  STT
                </th>
                <th scope="col" className="px-6 py-3">
                  User
                </th>
                <th scope="col" className="px-6 py-3">
                  Position
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>

                <th scope="col" className="px-6 py-3">
                  Sex
                </th>

                <th scope="col" className="px-6 py-3">
                  Roles
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
              {loading ? (
                <div> loading ... </div>
              ) :  (
                <React.Fragment>
                  {data.map((item, index) => (
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
                          <label
                            for="checkbox-table-search-1"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </td>
                      <td className="px-6 py-4">{index}</td>
                      <th
                        scope="row"
                        className="flex items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        <img
                          className="w-10 h-10 rounded-full"
                          src={avatar}
                          alt="Jese image"
                        />
                        <div className="pl-3">
                          <div className="text-base font-semibold">
                            {" "}
                            {item.userName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {" "}
                            {item.emailAddress}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.positionName}</td>

                      <td className="px-6 py-4">Staff</td>

                      <td className="px-6 py-4">Male</td>
                      <td className="px-6 py-4">{item.roleNames}</td>
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
                      <td className="px-6 py-8">
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

export default UserScreen;
