"use client";

import Link from "next/link";
import { Baby } from "lucide-react";
import { usePathname } from "next/navigation";

import { ISidebar } from "@/interface";

export const Sidebar = () => {
  const router = usePathname();
  const sidebarLinks: ISidebar[] = [
    {
      name: "Dashboard",
      path: "/dashboard",
      sublist: [],
    },
    {
      name: "Users",
      path: "/users",
      sublist: [],
    },
    {
      name: "Games",
      path: "/games",
      sublist: [],
    },
    {
      name: "Categories",
      path: "/categories",
      sublist: [],
    },
    {
      name: "Currencies",
      path: "/Currencies",
      sublist: [],
    },
    {
      name: "Items",
      path: "/items",
      sublist: [],
    },
    {
      name: "Bundles",
      path: "/bundles",
      sublist: [],
    },
    {
      name: "Discounts",
      path: "/discounts",
      sublist: [],
    },
    {
      name: "Transactions",
      path: "/transactions",
      sublist: [],
    },
  ];

  return (
    <div className="h-screen w-[240px] bg-[#f4f5f7] overflow-y-auto fixed left-0 top-0 border-r border-solid border-slate-200">
      <div className="flex justify-center items-center mb-6 bg-white py-7 border-b border-solid border-slate-200">
        <span className="flex justify-center items-center w-[36px] h-[36px] bg-indigo-600 rounded-full">
          <Baby size={24} className="text-white" />
        </span>
        <p className="ml-2 font-bold text-2xl text-indigo-600">Genify</p>
      </div>
      <div className="w-full px-4 pt-7 ">
        <ul>
          {sidebarLinks.map((link) => (
            <li key={link.name} className="py-1">
              {
                <Link
                  href={link.path || "/"}
                  className={`${
                    router === link.path
                      ? "bg-[#e5e7eb] text-black shadow-md border border-solid border-slate-300"
                      : "border-transparent"
                  } flex justify-start transition ease-in-out items-center py-2 px-4 rounded border border-solid hover:bg-[#e5e7eb] hover:shadow-md hover:text-black hover:border hover:border-solid hover:border-slate-300`}
                >
                  {/* <span className="mr-4 h-5 w-5 sidebar_icon">{link.icon}</span> */}
                  <div className="flex justify-between items-center w-full">
                    <p className="font-medium">{link.name}</p>
                  </div>
                </Link>
              }
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
