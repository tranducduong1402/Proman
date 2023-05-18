import { useEffect, useRef, useState } from "react";
import Search from "../Search/Search";
import { useDispatch, useSelector } from "react-redux";
import { ROLE_CREATE_RESET } from "../../Redux/Constants/RoleContants";
import { createRole } from "../../Redux/Actions/RoleAction";
import FormInput from "../FormInput/FormInput";
import SelectMenu from "../SelectedMenu/SelectMenu";
import Tabs from "../Tabs/Tabs";
import DropDownListUser from "../Dropdown/DropDownListUser";
import avatar from "../../data/image/avatar.jpg";
import { registerProject } from "../../Redux/Actions/ProjectAction";

const ProjectHeader = ({ name }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [dataMember, setDataMember] = useState([]);

  const modalRef = useRef(null);
  const handleClose = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  const inputs = [
    {
      id: 1,
      name: "name",
      type: "text",
      placeholder: "Project Name",
      pattern: "^[A-Za-z0-9]{5,30}$",
      errorMessage: "name must be length from 5 to 30 characters",
      label: "Project Name",
      required: true,
    },
    {
      id: 2,
      name: "code",
      type: "text",
      placeholder: "Url",
      errorMessage: "description must be length from 5 to 30 characters",
      label: "UrL",
      required: true,
    },
    {
      id: 3,
      name: "timeStart",
      type: "date",
      label: "Start Date",
      required: true,
    },
    {
      id: 4,
      name: "timeEnd",
      type: "date",
      label: "End Date",
      required: true,
    },
  ];

  const SelectInput2 = [
    {
      name: "Client",
      title: "customerId",
      default: "Choose Value",
      options: [
        {
          name: "Client 1",
          value: 79,
        },
        {
          name: "Client 2",
          value: 79,
        },
      ],
    },
    {
      name: "Project Type",
      title: "projectType",
      default: "Choose Value",
      options: [
        {
          value: 0,
          name: "Product",
        },
        {
          value: 1,
          name: "Out Source",
        },
      ],
    },
  ];

  //call api
  const [values, setValues] = useState({
    name: null,
    code: null,
    projectType: null,
    customerId: 79,
    timeStart: null,
    timeEnd: null,
  });

  const [memberProject, setMemberProject] = useState({
    users: [],
  });
  const [projectTargetUsers, setprojectTargetUsers] = useState({
    projectTargetUsers: [],
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const removeMember = (member) => {
    setDataMember((prev) => prev.filter((item) => item.id != member.id));
  };
  
  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerProject({...values, ...memberProject,...projectTargetUsers}));
    setIsOpen(!isOpen);
  };

  return (
    <div className=" mb-7 mx-5 mt-8">
      <div className="flex justify-between">
        <div>
          <Search namesearch={name} />
        </div>
        <div className="">
          <button
            className="bg-main_color text-white hover:opacity-80 w-[118px] h-[50px] rounded-lg text-sm"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i class="fa-solid fa-plus mr-2"></i>
            Add Project
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-[0.81]">
          <div className="bg-white rounded-md shadow-md p-4">
            <h2 className="text-[14px] text-black font-bold mb-5 ">
              Create New Project
            </h2>
            <div className="flex border-b-2 mb-4">
              <button
                className={`w-full ${
                  selectedTab === 0
                    ? "border-l-2 border-t-2 border-r-2 rounded-t-lg"
                    : ""
                }`}
                onClick={() => setSelectedTab(0)}
              >
                General
              </button>
              <button
                className={`w-full ${
                  selectedTab === 1
                    ? "border-l-2 border-t-2 border-r-2 rounded-t-lg"
                    : ""
                }`}
                onClick={() => setSelectedTab(1)}
              >
                Team
              </button>
            </div>
            <div className="mt-4">
              {selectedTab === 0 && (
                <div
                  className="bg-[#FFFFFF] p-8 rounded-lg  mt-5"
                  ref={modalRef}
                >
                  <div className="w-[820px] h-[500px]">
                    <form onSubmit={submitHandler}>
                      <div className="w-[730px] mx-auto">
                        <FormInput
                          key={inputs[0].id}
                          {...inputs[0]}
                          value={values[inputs.name]}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="flex justify-around">
                        <div className="w-[320px]">
                          <FormInput
                            key={inputs[1].id}
                            {...inputs[1]}
                            value={values[inputs.name]}
                            onChange={handleChange}
                          />
                          {SelectInput2.map((item) => (
                            <SelectMenu
                              props={item}
                              onChange={handleChange}
                              value={values[item.title]}
                            />
                          ))}
                        </div>
                        <div className=" w-[320px]">
                          <FormInput
                            key={inputs[2].id}
                            {...inputs[2]}
                            value={values[inputs.name]}
                            onChange={handleChange}
                          />
                          <FormInput
                            key={inputs[3].id}
                            {...inputs[3]}
                            value={values[inputs.name]}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className=" flex justify-end mr-5 mt-20">
                        <button
                          className="text-black bg-[#EEEFF3] px-4 py-2 rounded-lg mr-8 text-[15px] hover:opacity-80"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          Cancel
                        </button>
                        <button
                          className="text-white bg-main_color px-5 py-2 rounded-lg  text-[15px] hover:opacity-90"
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
              {selectedTab === 1 && (
                <div className="flex w-[900px] justify-between ">
                  <div>
                    Select Member
                    {dataMember.map((member, index) => (
                      <div
                        className="flex bg-slate-300 rounded-md w-[520px] h-14 mt-4"
                        key={member.id}
                      >
                        <div
                          className="mt-4 mx-5 cursor-pointer"
                          onClick={() => removeMember(member)}
                        >
                          {" "}
                          X{" "}
                        </div>
                        <div className="flex items-center  py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={avatar}
                            alt="image user"
                          />
                          <div className="pl-3 pr-5">
                            <div className="text-base font-semibold">
                              {member.userName}
                            </div>
                            <div className="font-normal text-gray-500">
                              {member.emailAddress}
                            </div>
                          </div>
                          <div>
                            <select
                              className="rounded-lg w-24 h-9 px-5 text-[13px]  align-middle"
                              onChange={(e) => {
                                let user =
                                  projectTargetUsers.projectTargetUsers.find(
                                    (user) =>
                                      user.userId === parseInt(member.id)
                                  );
                                user["roleName"] = e.target.value;
                        
                              }}
                            >
                              {index === 0 ? (
                                <>
                                  <option selected> PM</option>
                                  <option> Basic User </option>
                                </>
                              ) : (
                                <>
                                  <option> PM</option>
                                  <option selected> Basic User </option>
                                </>
                              )}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <DropDownListUser
                    setDataMember={setDataMember}
                    dataMember={dataMember}
                    setMemberProject={setMemberProject}
                    memberProject={memberProject}
                    setprojectTargetUsers={setprojectTargetUsers}
                    projectTargetUsers={projectTargetUsers}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHeader;
