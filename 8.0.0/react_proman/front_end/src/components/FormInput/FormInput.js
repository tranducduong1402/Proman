import React from 'react'

const FormInput = ( props ) => {
    const { label, status, errorMessage, onChange, id, ...inputProps } = props;
    console.log('day la status cua project',status)
  return (
    <div>
    <div class="mb-3">
    <label for="default-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
      {label}
    </label>
    <input type="text" id="default-input"
     className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
      status ? 'pointer-events-none' : ''
    }`}
     
     {...inputProps}
     onChange={onChange}
     />
   </div>
    </div>
  )
}

export default FormInput
