import React, { useRef, useState } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import DropMenu from '../../components/Dropdown/DropMenu';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';
import avatar from '../../data/image/avatar.jpg';
import Board from '../Board/Board';

const TaskScreen = () => {
    const options = ['View', 'Edit', 'Delete'];

    return (
        <div className='flex'>
            <Sidebar />
            <div className='h-full flex-1 p-7 bg-[#EEEFF3]'>
                <Breadcrumb pagename1='Job' pagename2='Task Detail' />
                
                   <Board/>
            </div>
        </div>
    );
};

export default TaskScreen;
