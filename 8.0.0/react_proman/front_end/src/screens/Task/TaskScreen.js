import React, { useRef, useState } from 'react';
import { Breadcrumb } from '../../components/Breadcrumb/Breadcrumb';
import DropMenu from '../../components/Dropdown/DropMenu';
import Header from '../../components/Header/Header';
import Navbar from '../../components/Navbar/Navbar';
import Pagination from '../../components/Pagination/Pagination';
import Sidebar from '../../components/Sidebar/Sidebar';
import avatar from '../../data/image/avatar.jpg';
const TaskScreen = () => {
    const options = ['View', 'Edit', 'Delete'];

    return (
        <div className='flex'>
            <Sidebar />
            <div className='h-full flex-1 p-7 bg-[#EEEFF3]'>
                <Breadcrumb pagename1='Job' pagename2='Task Detail' />
                
                <div className="h-full m-12 bg-[#fff] rounded-lg">
                    <p class ="text-3xl font-bold pl-7 pt-7">This is task name</p>
                    <div class="h-px m-8 bg-[#ebe8ff]"></div>
                    <div class="m-8 flex justify-end gap-4">   
                        <div class="flex -space-x-4">
                            <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://picsum.photos/237" alt=""/>
                            <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://picsum.photos/250" alt=""/>
                            <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://picsum.photos/230" alt=""/>
                            <img class="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src="https://picsum.photos/240" alt=""/>
                            <a class="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-blue-600 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#">+4</a>
                        </div>
                        <button type="button" class="text-blue-700 bg-blue-100 hover:bg-blue-200 font-normal rounded text-sm px-6 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">4 comments</button>
                        <button type="button" class="text-blue-700 bg-blue-100 hover:bg-blue-200 font-normal rounded text-sm px-6 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</button>
                        <button type="button" class="text-blue-700 bg-blue-100 hover:bg-blue-200 font-normal rounded text-sm px-6 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Invite People</button>
                        <button type="button" class="text-white bg-blue-700 hover:bg-blue-800 font-normal rounded text-sm px-6 py-3 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">New Task</button>

                    </div>
                    <div class="h-px m-8 bg-[#ebe8ff]"></div>
                    <p class ="text-2xl font-bold pl-7 pb-6">Task Description</p>
                    <p class ="text-lg font-light px-7">Etiam convallis elementum sapien, a aliquam turpis aliquam vitae. Praesent sollicitudin felis vel mi facilisis posuere. Nulla ultrices facilisis justo, non varius nisl semper vel. Interdum et malesuada fames ac ante ipsum primis in faucibus. Phasellus at ante mattis, condimentum velit et, dignissim nunc. Integer quis tincidunt purus. Duis dignissim mauris vel elit commodo.</p>
                    <div class="m-8 flex justify-between flex-wrap">
                        <div class="w-5/12 mb-8">
                            <label for="status" class=" block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Status</label>
                            <select id="status" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a status</option>
                                <option value="new">New Task</option>
                                <option value="approved">Approved</option>
                                <option value="inprocess">In process</option>
                                <option value="testing">Testing</option> 
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div class="w-5/12 mb-8">
                            <label for="prioriry" class="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Priority</label>
                            <select id="priority" class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected>Choose a priority</option>
                                <option value="new">Very Low</option>
                                <option value="approved">Low</option>
                                <option value="inprocess">High</option>
                                <option value="testing">Very High</option> 
                            </select>
                        </div>
                        <div class="w-full mb-8">
                            <label for="large-input" class="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Assignees</label>
                            <input type="text" id="default-input" class=" bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        <div class="w-5/12 mb-6">
                            <label for="large-input" class="block mb-2 text-lg font-semibold text-gray-900 dark:text-white">Original Estimate (Hours)</label>
                            <input type="text" id="default-input" class=" bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                        </div>
                        
                        <div class="w-5/12 mb-6">
                            <div class="flex justify-between mb-3">
                                <span class="text-lg font-semibold  text-gray-900 dark:text-white">Time Tracking</span>
                            </div>
                            <div class="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mb-3">
                                <div class="bg-blue-600 h-1.5 rounded-full" style={{width: '66%'}}></div>
                            </div>
                            <div class="flex justify-between mb-4">
                                <span class="text-base font-semibold  text-gray-900 dark:text-white">6h logged</span>
                                <span class="text-base font-semibold  text-gray-900 dark:text-white">9h estimated</span>
                            </div>
                        </div>
                        
                        

                        
            
                    </div>

                    <div class ="m-8 pb-4">        
                        <form>
                            <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                                    <label for="comment" class="sr-only">Your comment</label>
                                    <textarea id="comment" rows="4" class="w-full px-0 text-base text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
                                </div>
                                <div class="flex items-center justify-end px-3 py-2 border-t dark:border-gray-600">
                                    <button type="submit" class="inline-flex  items-center py-2.5 px-4 text-base font-semibold text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                        Post comment
                                    </button>
                                    <div class="flex pl-0 space-x-1 sm:pl-2">
                                        <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                                            <span class="sr-only">Attach file</span>
                                        </button>
                                        
                                        <button type="button" class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                                            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                                            <span class="sr-only">Upload image</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>

                            <section class="bg-white dark:bg-gray-900">
                                <div class="mx-auto">
                                    <article class="p-6  text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                                <p class="inline-flex items-center mr-3 text-md text-gray-900 dark:text-white"><img
                                                        class="mr-2 w-10 h-10 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                                        alt="Michael Gough"/>Michael Gough</p>
                                                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                                        title="February 8th, 2022">Feb. 8, 2022</time></p>
                                            </div>
                                            <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                                <span class="sr-only">Comment settings</span>
                                            </button>
                                            {/* <!-- Dropdown menu --> */}
                                            <div id="dropdownComment1"
                                                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </footer>
                                        <p class="text-gray-500 dark:text-gray-400">Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                                            instruments for the UX designers. The knowledge of the design tools are as important as the
                                            creation of the design strategy.</p>
                                        <div class="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                Reply
                                            </button>
                                        </div>
                                    </article>
                                    <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                                        <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                                <p class="inline-flex items-center mr-3 text-md text-gray-900 dark:text-white"><img
                                                        class="mr-2 w-10 h-10 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                                        alt="Jese Leos"/>Jese Leos</p>
                                                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12"
                                                        title="February 12th, 2022">Feb. 12, 2022</time></p>
                                            </div>
                                            <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                                <span class="sr-only">Comment settings</span>
                                            </button>
                                            {/* Dropdown menu  */}
                                            <div id="dropdownComment2"
                                                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </footer>
                                        <p class="text-gray-500 dark:text-gray-400">Much appreciated! Glad you liked it ☺️</p>
                                        <div class="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                Reply
                                            </button>
                                        </div>
                                    </article>
                                    <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                                <p class="inline-flex items-center mr-3 text-md text-gray-900 dark:text-white"><img
                                                        class="mr-2 w-10 h-10 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                                        alt="Bonnie Green"/>Bonnie Green</p>
                                                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                                                        title="March 12th, 2022">Mar. 12, 2022</time></p>
                                            </div>
                                            <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                                <span class="sr-only">Comment settings</span>
                                            </button>
                                            {/* Dropdown menu  */}
                                            <div id="dropdownComment3"
                                                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </footer>
                                        <p class="text-gray-500 dark:text-gray-400">The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
                                        <div class="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                Reply
                                            </button>
                                        </div>
                                    </article>
                                    <article class="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                        <footer class="flex justify-between items-center mb-2">
                                            <div class="flex items-center">
                                                <p class="inline-flex items-center mr-3 text-md text-gray-900 dark:text-white"><img
                                                        class="mr-2 w-10 h-10 rounded-full"
                                                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                                        alt="Helene Engels"/>Helene Engels</p>
                                                <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-06-23"
                                                        title="June 23rd, 2022">Jun. 23, 2022</time></p>
                                            </div>
                                            <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                                                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                                                type="button">
                                                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z">
                                                    </path>
                                                </svg>
                                            </button>
                                            {/* Dropdown menu  */}
                                            <div id="dropdownComment4"
                                                class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                    aria-labelledby="dropdownMenuIconHorizontalButton">
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"
                                                            class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </footer>
                                        <p class="text-gray-500 dark:text-gray-400">Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
                                        <div class="flex items-center mt-4 space-x-4">
                                            <button type="button"
                                                class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400">
                                                <svg aria-hidden="true" class="mr-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                                                Reply
                                            </button>
                                        </div>
                                    </article>
                                </div>
                            </section>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default TaskScreen;
