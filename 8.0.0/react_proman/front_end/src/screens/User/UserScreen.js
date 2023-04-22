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
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import SelectFilter from "../../components/SelectedMenu/SelectFilter";
import DropPagination from "../../components/Dropdown/DropPagiation";

const UserScreen = () => {
  const [dataFilter, setDataFilter] = useState([]);
  const listFilter = Object.entries(dataFilter).map((filter) => ({
    propertyName: filter[0],
    value: filter[1],
    comparison: 0,
  }));

  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userDelete = useSelector((state) => state.userDelete);
  const { error: errorDelete, success: successDelete } = userDelete;

  const userUpdate = useSelector((state) => state.userUpdate);

  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userCreate = useSelector((state) => state.adminCreate);
  const { error: errorCreate, success: successCreate } = userCreate;

  //pagination
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);
  const [maxResultCount, setMaxResultCount] = useState(4);
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

  // call api get all user
  useEffect(() => {
    dispatch(listUser(keyword, listFilter, maxResultCount, skipCount));
  }, [
    dispatch,
    successDelete,
    successUpdate,
    keyword,
    successCreate,
    dataFilter,
    num,
    maxResultCount
  ]);

  const options = ["View", "Edit", "Delete"];

  // render value input
  const renderType = (value) => {
    let name = null;
    switch (value) {
      case 0: {
        return (name = "Staff");
      }
      case 1: {
        return (name = "Internship ");
      }
      case 2: {
        return (name = "Collaborators  ");
      }
      case 3: {
        return (name = "ProbationaryStaff  ");
      }

      case 4: {
        return (name = "Client  ");
      }
    }
  };
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
      <div className="h-[180vh] flex-1 p-7 bg-[#EEEFF3]">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <Header name={"user"} sendDataToParent={handleDataFilter} />

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
                <Loading />
              ) : (
                <React.Fragment>
                  {users.map((item, index) => (
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
                      <td className="px-6 py-4">
                        {(num - 1) * maxResultCount + (index + 1)}
                      </td>
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
                            {item.userName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {item.emailAddress}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4">{item.positionName}</td>

                      <td className="px-6 py-4">{renderType(item.type)}</td>
                      <td className="px-6 py-4">{renderSex(item.sex)}</td>
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
                        <DropMenu
                          options={options}
                          id={item.id}
                          name={"user"}
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              )}
            </tbody>
          </table>
                            
          <div className="flex bg-white rounded-lg font-[Poppins] py-6 justify-center">

          <DropPagination 
            props={maxCount}
            onChange={(e) => setMaxResultCount(e.target.value)}
            value={maxResultCount}
            />  
            <div>
            <button
              onClick={back}
              className="h-[45px] border-2 border-r-0 border-blue-600
               px-4 rounded-l-lg hover:bg-blue-600 hover:text-white"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            <button
              onClick={Next}
              className="h-[45px] border-2  border-blue-600
               px-4 rounded-r-lg hover:bg-blue-600 hover:text-white"
            >
              <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                <path
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clip-rule="evenodd"
                  fill-rule="evenodd"
                ></path>
              </svg>
            </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UserScreen;
