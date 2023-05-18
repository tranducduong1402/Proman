import React, { useState } from 'react'

const Tabs = () => {
    const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="bg-white rounded-md shadow-md p-4">
      <div className="flex border-b-2 mb-4">
        <button 
          className={`w-full ${selectedTab === 0 ? 'border-l-2 border-t-2 border-r-2 rounded-t-lg' : ''}`} 
          onClick={() => setSelectedTab(0)}
        >
          Tab 1
        </button>
        <button 
          className={`w-full ${selectedTab === 1 ? 'border-l-2 border-t-2 border-r-2 rounded-t-lg' : ''}`} 
          onClick={() => setSelectedTab(1)}
        >
          Tab 2
        </button>
      </div>
      <div className="mt-4">
        {selectedTab === 0 && (
          <p>Content for Tab 1 goes here.</p>
        )}
        {selectedTab === 1 && (
          <p>Content for Tab 2 goes here.</p>
        )}
      </div>
    </div>
  )
}

export default Tabs
