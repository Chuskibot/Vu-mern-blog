import { Sidebar } from 'flowbite-react';
import React from 'react';
import { HiUser, HiArrowSmRight } from 'react-icons/hi';
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <Sidebar className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
        <Link to='/dashboard?tab=profile'>
          <Sidebar.Item
            active ={tab === 'profile'}
            icon={() => (
              <HiUser className="text-gray-900 dark:text-white" />
            )}
            className="mb-4 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Profile
          </Sidebar.Item>
          </Link>
          <Sidebar.Item
            
            icon={() => (
              <HiArrowSmRight className="text-gray-900 dark:text-white" />
            )}
            className="p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
