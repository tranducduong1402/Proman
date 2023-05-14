import React, { useEffect} from "react";
import { Breadcrumb } from "../../components/Breadcrumb/Breadcrumb";
import DropMenu from "../../components/Dropdown/DropMenu";
import Pagination from "../../components/Pagination/Pagination";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { listPosition } from "../../Redux/Actions/PositionAction";
import { useParams } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import PositionHeader from "../../components/Header/PositionHeader";
import DropMenuPosition from "../../components/Dropdown/DropMenuPosition";
const Position = () => {
  const dispatch = useDispatch();
  const keyword = useParams().keyword;

  const positionList = useSelector((state) => state.positionList);

  const { error, loading, positions } = positionList;

  const positionCreate = useSelector((state) => state.positionCreate);
  const { error: errorCreate, success: successCreate } = positionCreate;

  const positionDelete = useSelector((state) => state.positionDelete);
  const { error: errorDelete, success: successDelete } = positionDelete;

  const positionUpdate = useSelector((state) => state.positionUpdate);
  const { error: errorUpdate, success: successUpdate } = positionUpdate;

  useEffect(() => {
    dispatch(listPosition(keyword));
  }, [dispatch, successCreate, successDelete, successUpdate, keyword]);

  const options = ["View", "Edit", "Delete"];
  return (
    <div className="flex">
      <Sidebar />
      <div className="h-screen flex-1 p-7 bg-[#EEEFF3]">
        <Breadcrumb pagename1="Job" pagename2="Position" />
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <PositionHeader name ={"position"}/>
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className=" text-[13px] text-black font-bold">

                <th scope="col" className="px-6 py-3 font-bold text-black">
                  #
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
                <th scope="col" className="px-6 py-3">
                  Color
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (<div>
                <Loading/>
              </div>) : (
                <React.Fragment>
                  {positions.map((item, index) => (
                    <tr
                      key={item.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <td className="px-6 py-4">{index+1}</td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">{item.shortName}</td>
                      <td className="px-6 py-4">{item.code}</td>
                      <td className="px-6 py-4">{item.color}</td>
                      <td className="px-10 py-8 text-center">
                        <DropMenuPosition
                         options={options} id ={item.id} name = {"position"}/>
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

export default Position;
