import React from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import Sidebar from '../../components/Sidebar/Sidebar'

const HomeScreen = () => {
  const Admin = {
    title: 'Admin',
    children1: ' User',
    children2: ' Role ',
    children3: ' Client ',
    children4: ' Position User ',
}
  return (
    <div className='home'>
       <Sidebar/>
    </div>
  )
}

export default HomeScreen
