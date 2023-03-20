/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
    colors: {
       main_color: '#2563EB',
       colorText :'#828282'
    }

    },
  },
  plugins: [
        require('flowbite/plugin')
    ]
}
