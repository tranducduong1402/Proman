import React, { useEffect } from "react";
import avatar from "../../data/image/avatar.jpg";
import { useDispatch, useSelector } from "react-redux";
import { listUser } from "../../Redux/Actions/UserAction";
import Loading from "../Loading/Loading";

const DropDownListUser = ({
  setDataMember,
  dataMember,
  setMemberProject,
  memberProject,
  setprojectTargetUsers
}) => {
  const dispatch = useDispatch();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    dispatch(listUser());
  }, [dispatch]);
  return (
    <div className="flex-3">
      <div
        id="dropdownUsers"
        class="z-10  bg-white rounded-lg shadow w-60 dark:bg-gray-700"
      >
        <div className="mx-5 my-2 font-semibold"> Select team member </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              class="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="input-group-search"
            class="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search user"
          />
        </div>

        <ul
          class="h-48 py-2 overflow-y-auto text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownUsersButton"
        >
          {loading ? (
            <Loading />
          ) : (
            <>
              {users.map((user) => (
                <li key={user.id}>
                  <div
                    className="flex items-center 
                   py-4 text-gray-900 whitespace-nowrap dark:text-white cursor-pointer"
                    onClick={() => {
                      setDataMember([...dataMember, user]);
                      setMemberProject((prev) => ({
                        users: [
                          ...Object.values(prev),
                          {
                            userId: user.id,
                            type: 1,
                          },
                        ].flat(),
                      }));
                      
                      setprojectTargetUsers((prev) => ({
                        projectTargetUsers: [
                          ...Object.values(prev),
                          {
                            userId: user.id,
                            roleName: 'Basic User',
                          },
                        ].flat(),
                      }));
                    }}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={avatar}
                      alt="image user"
                    />
                    <div className="pl-3">
                      <div className="text-base font-semibold">
                        {user.userName}
                      </div>
                      <div className="font-normal text-gray-500">
                        {user.emailAddress}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
        <a
          href="#"
          class="flex items-center p-3 text-sm font-medium text-blue-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-blue-500 hover:underline"
        >
          <svg
            class="w-5 h-5 mr-1"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
          </svg>
          Add member
        </a>
      </div>
    </div>
  );
};

export default DropDownListUser;
