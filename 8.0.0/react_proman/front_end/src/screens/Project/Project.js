import React, { useEffect, useRef, useState } from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Header from "../../components/Header/Header";
import Navbar from "../../components/Navbar/Navbar";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listProject } from "../../Redux/Actions/ProjectAction";
import Loading from "../../components/Loading/Loading";
import moment from "moment/moment";
import ProjectHeader from "../../components/Header/HeaderProject";
import { useParams } from "react-router-dom";
import avatar from "../../data/image/avatar.jpg";
import DropDownAddNewMember from "../../components/Dropdown/DropDownAddNewMember";

const Project = () => {
  const data = [
    {
      projectName: "EO 45: Equity Metrics Reporting",
      code: "8790",
      projectType: "Product",
      createBy: "admin",
      start: "2020/02/08",
      end: "2020/03/25",
      isActive: true,
    },
    {
      projectName: "2020 SIER Scoping and procurement",
      code: "4845",
      projectType: "Product",
      createBy: "admin",
      start: "2021/12/12",
      end: "2022/03/02",
      isActive: true,
    },
    {
      projectName: "MODA communications Workshop",
      code: "1367",
      projectType: "Outsource",
      createBy: "Tinh",
      start: "2021/05/18",
      end: "2020/06/18",
      isActive: false,
    },
  ];
  const [isOpenAddMember, setOpenAddMember] = useState(false);
  const dispatch = useDispatch();
  const projectList = useSelector((state) => state.projectList);
  const { error, loading, projects } = projectList;
  const keyword = useParams().keyword;

  useEffect(() => {
    dispatch(listProject(keyword));
  }, [dispatch, keyword]);

  const options = ["View", "Edit", "Delete"];
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <Breadcrumb pagename1="Job" pagename2="Project" />

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <ProjectHeader name={"project"} />
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
                  Project Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Create By
                </th>
                <th scope="col" className="px-6 py-3">
                  Member
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
              {loading ? (
                <Loading />
              ) : (
                <React.Fragment>
                  {projects.map((item) => (
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
                      <td className="px-6 py-4">{item.name}</td>

                      <td className="px-6 py-4">
                        {item.projectType === 1 ? "Product" : "OutSource"}
                      </td>
                      <td className="px-6 py-4">{item.createdUserName}</td>
                      <td className="px-6 py-18">
                        <div className="flex align-middle justify-between">
                          <img
                            class="w-10 h-10 p-1 rounded-full ring-2 ring-gray-300 dark:ring-gray-500"
                            src={avatar}
                            alt="Bordered avatar"
                          />
                          <div
                            className="bg-main_color text-white ml-3 w-5 text-center h-5 mt-3 cursor-pointer"
                            onClick={() => setOpenAddMember(!isOpenAddMember)}
                          >
                            <DropDownAddNewMember/>
                          </div>
                          <div className="bg-red-500 text-white w-5 text-center h-5 mt-3 cursor-pointer">
                            <i class="fa-sharp fa-solid fa-xmark"></i>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {moment(item.timeStart).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-6 py-4">
                        {moment(item.timeEnd).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-6 py-8">
                        {item.status === 1 ? (
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
                        <DropMenu
                          options={options}
                          id={item.id}
                          name={"project"}
                        />
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

export default Project;
