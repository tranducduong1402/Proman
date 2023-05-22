import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar from "../../data/image/avatar.jpg";
import { listClient } from "../../Redux/Actions/ClientAction";
import Loading from "../../components/Loading/Loading";
import HeaderClient from "../../components/Header/HeaderClient";
import DropMenuClient from "../../components/Dropdown/DropMenuClient";
const ClientScreen = () => {

  const [dataFilter, setDataFilter] = useState([]);
  const listFilter = Object.entries(dataFilter).map((filter) => ({
    propertyName: filter[0],
    value: filter[1],
    comparison: 0,
  }));

  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const clientList = useSelector((state) => state.clientList);
  const { loading, error, clients } = clientList;

  const clientDelete = useSelector((state) => state.clientDelete);
  const { error: errorDelete, success: successDelete } = clientDelete;

  const clientUpdate = useSelector((state) => state.clientUpdate);
  console.log ("clientUpdate", clientUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = clientUpdate;

  const clientCreate = useSelector((state) => state.clientCreate);
  const { error: errorCreate, success: successCreate } = clientCreate;

  //pagination
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(5);
  const [skipCount, setSkipCount] = useState(0);

  const maxCount = {
    name: "pagination",
    title: "pagination",
    options: [5, 10, 15],
  };

  const pages = [{ page: num }, { page: num + 1 }, { page: num + 2 }];
  function Next() {
    setNum(++num);
    const skipUser = (num - 1) * maxResultCount;
    setSkipCount(skipUser);
  }

  function back() {
    if (num > 1) {
      setNum(--num);
      const skipUser = (num - 1) * maxResultCount;
      setSkipCount(skipUser);
    }
  }

  // call api get all client
  useEffect(() => {
    dispatch(listClient(keyword, listFilter, maxResultCount, skipCount));
  }, [dispatch, successDelete, successUpdate, keyword, successCreate, dataFilter,num,
    maxResultCount]);

  const options = ["View", "Edit", "Delete"];

  const renderSex = (value) => {
    let name = null;
    switch (value) {
      case 0: {
        return (name = "Male");
      }
      case 1: {
        return (name = "FeMale ");
      }
      default:
        return (name = null);
    }
  };

  // filter
  const handleDataFilter = (value) => {
    setDataFilter(value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <Breadcrumb pagename1="Admin" pagename2="Client" />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <HeaderClient />
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
                  Client
                </th>
                <th scope="col" className="px-6 py-3">
                  Sex
                </th>
                <th scope="col" className="px-6 py-3">
                  Number Project
                </th>
                <th>
                  Is Active
                </th>


                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <Loading />
              ) : (
                <React.Fragment>
                  {clients?.map((item, index) => (
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
                            {item.fullName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {" "}
                            {item.emailAddress}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{renderSex(item.sex)}</td>

                      <td className="px-6 py-4">{item.projectCount}</td>
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
                        <DropMenuClient options={options} id={item.id} name={"client"} />
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

export default ClientScreen;
