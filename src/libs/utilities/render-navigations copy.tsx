"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavNode } from "@/types";
import { useState } from "react";
import { FaChevronDown, FaChevronRight, FaRegFileAlt } from "react-icons/fa";

// const links = {
//    { label: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
// }

interface NestedMenuProps {
  items: NavNode[];
  isChildren?: boolean;
  closeAll?: () => void;
  level?: number;
}

const RenderNavigation = ({
  items,
  isChildren = false,
  // closeAll,
  level = 1,
}: NestedMenuProps) => {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // const [visible, setVisible] = useState<number | null>(null);
  // const [menuClosed, setMenuClosed] = useState<boolean>(false); // for d-none control

  // const handleToggle = (id: number) => {
  //   setVisible((prev) => (prev === id ? null : id));
  //   setMenuClosed(false); // show the menu
  // };

  return (
    <ul
      className={`relative ${isChildren ? "flex-col space-y-2" : "flex-col gap-0.5 md:flex-row space-x-8"
        } flex items-start`}
    >
      {items.map((item) => {
        ;
        const isActive = pathname === item.href;
        const hasChildren = item.children && item.children.length > 0;

        // const handleClick = (e: React.MouseEvent) => {
        //   if (hasChildren) {
        //     e.preventDefault();
        //     handleToggle(item.id);
        //   } else {
        //     // Leaf node: close all menus after click
        //     setVisible(null);
        //     setMenuClosed(true); // trigger d-none class
        //     closeAll?.();
        //   }
        // };

        return (
          <li key={item.id} className="group list-none"
            onMouseEnter={() => hasChildren && setHoveredId(item.id)}
            onMouseLeave={() => hasChildren && setHoveredId(null)}
          >

            {/* <Link
              // href={hasChildren ? "#" : item.href}
              // // onClick={handleClick}
              // className={`block py-1 text-sm transition whitespace-nowrap ${isActive ? "text-[#333]" : "hover:text-[#111]"
              //   } ${menuClosed ? "d-none" : ""}`}
              href={hasChildren ? "#" : item.href}
              className={`block py-4 text-sm transition whitespace-nowrap flex items-center gap-1 ${isActive ? "text-[#333]" : "hover:text-[#111]"}`}
            >
              {item.label}
              {hasChildren && (
                <FaChevronDown
                  className={`ml-1 transition-transform duration-200 ${hoveredId === item.id ? "rotate-180" : ""
                    }`}
                  size={10}
                />

              )}
              
            </Link> */}
            <Link
              href={hasChildren ? "#" : item.href}
              className={`py-4 text-sm transition whitespace-nowrap flex items-center justify-between gap-2`}
            >
              {/* Left side with optional file icon */}
              <span className="flex items-center gap-1">
                {level > 1 && <FaRegFileAlt className="text-gray-400" size={12} />} {/* show doc icon only for children */}
                {item.label}
              </span>

              {/* Right side with arrow icon */}
              {hasChildren && (
                level === 1 ? (
                  <FaChevronDown
                    className={`transition-transform duration-200 ${hoveredId === item.id ? "rotate-180" : ""}`}
                    size={10}
                  />
                ) : (
                  <FaChevronRight size={10} />
                )
              )}
            </Link>

            {hasChildren && hoveredId === item.id && (

              <div
                className={`absolute bg-white z-50 text-[#333] submenu-custom-postion shadow-md min-w-[150px]`}
              >

                <div className="p-2">
                  <RenderNavigation
                    items={item.children!}
                    isChildren={true}
                    level={level + 1}
                  />
                </div>

              </div>
            )}

          </li>
        );
      })}
    </ul>
  );
};

export default RenderNavigation;
