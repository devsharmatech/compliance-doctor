"use client";
import "./header.css";
import { groupNavItemsByType, buildNavTree } from "@/libs/hooks/useMenuBuilder";
import { Button } from "../ui/Button";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "@public/images/logo.svg";
import { headerItems } from "@/libs/constants/headerlist";
import { BiMenu, BiSearch, BiX } from "react-icons/bi";
import { useGetNavigationQuery } from "@/store/api-services/navigation-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaArrowDown, FaRegFileAlt, FaUser } from "react-icons/fa";
import { useGetAllConsultTypeQuery } from "@/store/api-services/consultApi";
import SearchBar from "@/components/LayoutComponents/SearchBar";
import { RenderNavigation } from "@/libs/utilities";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const {
    data: navItems = [],
    isLoading,
    isError,
  } = useGetNavigationQuery({}, { skip: !isAuthenticated });
  const { data: consultTypes = [], isLoading: loadingConsults } =
    useGetAllConsultTypeQuery();
  const combinedNavItems = [...navItems];
  const combinedHeader = [...headerItems];
  const grouped = groupNavItemsByType(combinedNavItems);
  const groupedHeader = groupNavItemsByType(combinedHeader);
  const navbarTree = buildNavTree(grouped.navbar);
  const headerTree = buildNavTree(groupedHeader.navbar);
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileMenu, setIsMobileMenu] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleLoginClick = () => router.push("/login");

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <header className="bg-white px-4 md:px-12 py-4 w-full border-b border-gray-200 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center gap-6">
          <RenderNavigation items={headerTree} />

          {isAuthenticated ? (
            <Link
              href="/profile"
              className="ml-2 flex items-center font-bold text-gray-700 hover:text-green-700 transition-colors duration-300"
            >
              <FaUser size={22} /> <span className="ml-1 text-gray-700 hover:text-green-700 transition-colors duration-300 mt-2">Profile</span>
            </Link>
          ) : (
            <Button
              className="ml-2 px-5 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          )}
        </div>

        {/* Consult Button with Dropdown */}
        <div ref={dropdownRef} className="ml-4 relative">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className="flex flex-row gap-2 items-center 
                 bg-blue-700 text-white px-5 py-2 
                 rounded-full cursor-pointer font-medium
                 transition-all duration-300 ease-in-out
                 hover:bg-blue-800 hover:scale-105
                 active:scale-95 shadow-md"
          >
            Consult an Expert
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-3 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 animate-fadeIn">
              <ul className="py-2">
                {loadingConsults ? (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    Loading...
                  </li>
                ) : consultTypes.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-gray-500">
                    No consult types available
                  </li>
                ) : (
                  consultTypes.map((type) => (
                    <Link
                      href={`/consult?type=${encodeURIComponent(type.name)}`}
                      key={type._id}
                    >
                      <li
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-700 text-sm font-medium 
                             hover:bg-blue-50 hover:text-blue-700 cursor-pointer transition-all duration-200 rounded-lg"
                      >
                        <FaRegFileAlt className="text-blue-600" />
                        {type.name}
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="xl:hidden flex items-center gap-2">
          <button
            onClick={() => setIsMobileMenu(!isMobileMenu)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition"
          >
            {isMobileMenu ? <BiX size={30} /> : <BiMenu size={30} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu */}
      {isMobileMenu && (
        <div className="absolute right-0 flex flex-col w-full border border-gray-200 bg-white px-6 py-4 xl:hidden z-40 shadow-md animate-slideDown">
          <div>
            <RenderNavigation
              items={navbarTree}
              closeAll={() => setIsMobileMenu(false)}
            />
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <RenderNavigation items={headerTree} />
          </div>
          {isAuthenticated ? (
            <Link
              href="/profile"
              className="flex items-center px-5 py-2 text-gray-700 hover:text-green-700 transition-colors duration-300"
            >
              <FaUser size={20} className="mr-2" />
              Profile
            </Link>
          ) : (
            <Button
              className="px-5 py-2 rounded-full text-sm font-medium bg-green-600 text-white hover:bg-green-700 transition-all duration-300"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          )}
        </div>
      )}

      <nav className="w-full topMenu">
        <div className="flex items-center justify-end xl:justify-between relative px-4 md:px-12">
          <div className="hidden xl:flex flex-1 justify-center">
            <RenderNavigation items={navbarTree} />
          </div>
        </div>
      </nav>
    </>
  );
};
