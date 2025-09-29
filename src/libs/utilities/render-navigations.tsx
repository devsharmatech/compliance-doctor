"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavNode } from "@/types";
import { useState, useEffect } from "react";
import { FaChevronDown, FaChevronRight, FaRegFileAlt } from "react-icons/fa";

interface NestedMenuProps {
  items: NavNode[];
  isChildren?: boolean;
  closeAll?: () => void;
  level?: number;
}

const RenderNavigation = ({
  items,
  isChildren = false,
  closeAll,
  level = 1,
}: NestedMenuProps) => {
  const pathname = usePathname();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  
  const [openId, setOpenId] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      if (typeof window !== "undefined") {
        setIsMobile(window.matchMedia("(hover: none)").matches);
      }
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  const toggleOpen = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <ul
      className={`relative ${isChildren ? "flex-col space-y-2" : "flex-col gap-3 md:gap-0 md:flex-row md:w-full justify-center"
        } flex items-start`}
    >
      {items.map((item, index) => {
        const isActive = pathname === item.href;
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = openId === item.id;

        return (
          <li key={`${item.id}-${item.href}-${level}-${index}`} className="group list-none"
           
           onMouseEnter={() => {
              if (!isMobile && hasChildren) {
                setHoveredId(item.id);
              }
            }}
            onMouseLeave={() => !isMobile && hasChildren && setHoveredId(null)}>
            <div
              onClick={() => isMobile && hasChildren && toggleOpen(item.id)}

              className="px-2 transition whitespace-nowrap flex items-center justify-between w-full"
            >

              <span className="flex items-center gap-1">
                {level > 1 && <FaRegFileAlt className="text-gray-700 hover:text-green-600 " size={12} />} {/* show doc icon only for children */}

                <Link className="font-semibold text-gray-500 hover:text-green-600 transition-colors duration-300" href={hasChildren ? "#" : item.href} onClick={() => { if(!hasChildren && closeAll) closeAll() }}
                >{item.label}
                </Link>
              </span>

              {hasChildren && (
                level === 1 ? (
                  <FaChevronDown
                    className={`ml-2 transition-transform duration-200 ${isOpen || hoveredId === item.id ? "rotate-180" : ""}`}
                    size={10}
                  />
                ) : (
                  <FaChevronRight size={10} className="ml-1" />
                )
              )}

            </div>

            {hasChildren &&
              ((isMobile && isOpen) || (!isMobile && hoveredId === item.id)) && (
                <div className={`absolute submenu-custom-postion bg-white z-50 text-[#000] shadow-md submenu-level-${level}`}>
                  <div className="p-0">
                    <RenderNavigation
                      items={item.children!}
                      isChildren={true}
                      level={level + 1} 
                      closeAll={() => setOpenId(null)}
                    />
                  </div>
                </div>
              )
            }

          </li>
        );
      })}
      
    </ul>
  );
};

export default RenderNavigation;
