import { Sidebar } from "flowbite-react";
import React from "react";
import { HiUser, HiArrowSmRight,HiChartPie, HiDocumentText, HiOutlineUserGroup,HiAnnotation } from "react-icons/hi";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { signoutSuccess } from "../redux/user/userSlice";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignout = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Sidebar className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white">
  <Sidebar.Items>
    <Sidebar.ItemGroup>
    {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash'>
              <Sidebar.Item
                active={tab === 'dash' || !tab}
                icon={HiChartPie}
                as='div'
                className="mb-4 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
      <Link to="/dashboard?tab=profile">
        <Sidebar.Item
          active={tab === "profile"}
          icon={HiUser}
          label={currentUser.isAdmin ? "Admin" : "User"}
          labelColor="blue"
          className="mb-4 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-800"
          as="div"
        >
          Profile
        </Sidebar.Item>
      </Link>

      {currentUser.isAdmin && (
        <>
          <Link to="/dashboard?tab=posts">
            <Sidebar.Item
              active={tab === "posts"}
              icon={HiDocumentText}
              className="mb-4 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
              as="div"
            >
              Posts
            </Sidebar.Item>
          </Link>

          <Link to="/dashboard?tab=users">
            <Sidebar.Item
              active={tab === "users"}
              icon={HiOutlineUserGroup}
              className="mb-4 p-3 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700"
              as="div"
            >
              Users
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=comments'>
                <Sidebar.Item
                  active={tab === 'comments'}
                  icon={HiAnnotation}
                  as='div'
                >
                  Comments
                </Sidebar.Item>
              </Link>
        </>
      )}

      <Sidebar.Item
        onClick={handleSignout}
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
