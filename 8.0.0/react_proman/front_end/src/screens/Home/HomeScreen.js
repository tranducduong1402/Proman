import React from 'react'
import Dropdown from '../../components/Dropdown/Dropdown'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import UserScreen from '../User/UserScreen'
import Kaban from '../../components/Kaban/Kaban'

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
      <Kaban/>
    </div>
  )
}

export default HomeScreen
