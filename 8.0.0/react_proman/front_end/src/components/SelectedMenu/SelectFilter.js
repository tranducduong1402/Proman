import React from "react";
import { useNavigate } from "react-router-dom";

const SelectFilter = ({ props, onChange, value }) => {  

  return (
    <div className="mb-3">
      <label
        for="countries"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.name}
      </label>
      <select
        id="countries"
        class="
        bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
        dark:border-gray-600 dark:placeholder-gray-400
        dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={props.title}
        onChange={onChange}
        value={value}
      >
        <option> {props.default} </option>
        {props.options.map((option) => (
          <option value={option.value}> {option.name} </option>
        ))}
      </select>
    </div>
  );
};

export default SelectFilter;
