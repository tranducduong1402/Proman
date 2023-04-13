import React, { useRef, useState } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import DropMenu from '../../components/Dropdown/DropMenu';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';
import avatar from '../../data/image/avatar.jpg';
const RoleTree = () => {
    const data = [
        {
            id: '1',
            name: 'dev',
            shortName: 'dev',
            code: 'dev',
        },

        {
            id: '2',
            name: 'tester',
            shortName: 'tester',
            code: 'tester',
        },

        {
            id: '3',
            name: 'BA',
            shortName: 'BA',
            code: 'BA',
        },
    ];

    const options = ['View', 'Edit', 'Delete'];

    return (
        <div className='flex'>
            <Sidebar />
            <div className='h-screen flex flex-col flex-1 px-16 py-8 bg-[#EEEFF3]'>
                <Breadcrumb pagename1='Admin' pagename2='Role' />

                <div className='w-full h-full bg-white rounded'>
                    

                </div>
            </div>

            
        </div>
    );
};

export default RoleTree;
