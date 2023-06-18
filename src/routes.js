import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import DataTables from "views/admin/tables";
import CategoryDataTables from "views/admin/category";
import StoreDataTables from "views/admin/store";
import ItemDataTables from "views/admin/item";
// import NFTMarketplace from "views/admin/marketplace";
// import Profile from "views/admin/profile";
// import RTLDefault from "views/rtl/default";

// Auth Imports
// import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdBarChart,
  MdStore,
  MdCategory,
  MdFastfood,
} from "react-icons/md";

const routes = [
  // usecase routes

  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "Category",
    layout: "/admin",
    path: "category",
    icon: <MdCategory className="h-6 w-6" />,
    component: <CategoryDataTables />,
  },
  {
    name: "Store",
    layout: "/admin",
    path: "store",
    icon: <MdStore className="h-6 w-6" />,
    component: <StoreDataTables />,
  },
  {
    name: "Item",
    layout: "/admin",
    path: "item",
    icon: <MdFastfood className="h-6 w-6" />,
    component: <ItemDataTables />,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <MdBarChart className="h-6 w-6" />,
    path: "data-tables",
    component: <DataTables />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  // {
  //   name: "Sign In",
  //   layout: "/auth",
  //   path: "sign-in",
  //   icon: <MdLock className="h-6 w-6" />,
  //   component: <SignIn />,
  // },
  // {
  //   name: "RTL Admin",
  //   layout: "/rtl",
  //   path: "rtl",
  //   icon: <MdHome className="h-6 w-6" />,
  //   component: <RTLDefault />,
  // },
];
export default routes;
