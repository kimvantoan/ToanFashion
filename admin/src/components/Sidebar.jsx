import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import GroupIcon from '@mui/icons-material/Group';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { NavLink } from 'react-router-dom';
const sections = [
      { id: "dashboard", label: "Dashboard", icon: <HomeIcon fontSize="small" />, href: "/" },
      { id: "orders", label: "Orders", icon: <ReceiptLongIcon fontSize="small" />, badge: "10", href: "/orders" },
      { id: "products", label: "Products", icon: <Inventory2Icon fontSize="small" />, href: "/products" },
      { id: "categories", label: "Categories", icon: <FolderOpenIcon fontSize="small" />, href: "/categories" },
      { id: "customers", label: "Customers", icon: <GroupIcon fontSize="small" />, href: "/customers" },
      { id: "reports", label: "Reports", icon: <BarChartIcon fontSize="small" />, href: "/reports" },
      { id: "coupons", label: "Coupons", icon: <StarIcon fontSize="small" />, href: "/vouchers" },
      { id: "inbox", label: "Inbox", icon: <MailIcon fontSize="small" />, href: "/inbox" },
      { id: "personal-settings", label: "Personal Settings", icon: <PersonIcon fontSize="small" />, href: "/personal-settings" },
      { id: "global-settings", label: "Global Settings", icon: <SettingsIcon fontSize="small" />, href: "/global-settings" },
    ]
 
const Sidebar = () => {
   const [activeItem, setActiveItem] = useState("Dashboard");

  const handleItemClick = (item) => {
    setActiveItem(item);
  };
  return (
    <div className="w-64 bg-[#1E2337] text-white min-h-screen flex flex-col ">
      <div className="flex-1 overflow-y-auto">
        <nav className="mt-2">
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <NavLink
                  to={section.href}
                  onClick={() => handleItemClick(section.label)}
                  className={({ isActive }) =>
                    `flex items-center px-4 py-2 cursor-pointer hover:bg-gray-700 ${
                      isActive ? "bg-gray-700 " : ""
                    }`
                  }
                  end
                >
                  <span className="mr-3">{section.icon}</span>
                  <span>{section.label}</span>
                  {section.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {section.badge}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default Sidebar