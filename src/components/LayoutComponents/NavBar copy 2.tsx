'use client';
import "./header.css";
import { groupNavItemsByType, buildNavTree } from '@/libs/hooks/useMenuBuilder';
import { Button } from '../ui/Button';
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from '@public/images/logo.svg';
import { headerItems } from "@/libs/constants/headerlist";
import { BiMenu, BiSearch, BiX } from "react-icons/bi";
import { useGetNavigationQuery } from "@/store/api-services/navigation-api";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { FaArrowDown, FaRegFileAlt, FaUser } from "react-icons/fa";
import { useGetAllConsultTypeQuery } from "@/store/api-services/consultApi";
import SearchBar from '@/components/LayoutComponents/SearchBar';
import { RenderNavigation } from "@/libs/utilities";

export const Navbar = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const { data: navItems = [], isLoading, isError } = useGetNavigationQuery({}, { skip: !isAuthenticated });
  const { data: consultTypes = [], isLoading: loadingConsults } = useGetAllConsultTypeQuery();
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

  const handleLoginClick = () => router.push('/login');

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
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
      <header className="bg-[#ffffff] px-4 md:px-12 py-4 w-full border-b-white flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image src={logo} alt="" />
        </Link>
        <div className="hidden xl:flex items-center max-w-2xl w-full mx-5">
          <SearchBar />
        </div>
        <div className="hidden xl:flex items-center">
          <RenderNavigation items={headerTree} />
          {isAuthenticated ? (
            <Link href="/profile" className="ml-4 text-black hover:text-blue-500">
              <FaUser size={20} />
            </Link>
          ) : (
            <Button
              className="ml-4 px-5 py-2 rounded-md text-sm font-medium"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          )}
        </div>
        <div ref={dropdownRef} className="ml-4">
          <button
            onClick={() => setShowDropdown(prev => !prev)}
            className="flex flex-row gap-2 items-center cunsoltandexpert cursor-pointer"
          >
            Consult and Expert
          </button>
          {showDropdown && (
            <div className="absolute mt-2 w-fit bg-white border-2 border-gray-300 rounded-lg shadow-md z-50 consult-list">
              <ul className="space-y-1">
                {loadingConsults ? (
                  <li className="px-4 py-2 text-sm text-gray-500">Loading...</li>
                ) : consultTypes.length === 0 ? (
                  <li className="px-4 py-2 text-sm text-gray-500">No consult types available</li>
                ) : (
                  consultTypes?.map((type) => (
                    <Link href={`/consult?type=${encodeURIComponent(type.name)}`} key={type._id}>
                      <li
                        onClick={() => setShowDropdown(false)}
                        className="flex items-center px-4 py-2 text-black rounded-lg hover:bg-gray-100 cursor-pointer"
                      >
                        <FaRegFileAlt className="text-gray-400 mr-1" />
                        <span className="text-sm font-medium text-[#333]">{type.name}</span>
                      </li>
                    </Link>
                  ))
                )}
              </ul>
            </div>
          )}
        </div>
        <div className="xl:hidden flex items-center gap-2">
          <button onClick={() => setShowMobileSearch(!showMobileSearch)}>
            <BiSearch size={25} />
          </button>
          <button onClick={() => setIsMobileMenu(!isMobileMenu)}>
            {isMobileMenu ? <BiX size={30} /> : <BiMenu size={30} />}
          </button>
        </div>
      </header>
      {isMobileMenu && (
        <div className="absolute right-0 flex flex-col w-full border border-gray-300 bg-white px-6 py-4 xl:hidden z-40">
          <div>
            <RenderNavigation items={navbarTree} closeAll={() => setIsMobileMenu(false)} />
          </div>
          <hr className="my-4" />
          <div className="mb-4">
            <RenderNavigation items={headerTree} />
          </div>
          {isAuthenticated ? (
            <Link href="/profile" className="flex items-center px-5 py-2 text-black hover:text-blue-500">
              <FaUser size={20} className="mr-2" />
              Profile
            </Link>
          ) : (
            <Button
              className="px-5 ml-12 py-2 rounded-md text-sm font-medium"
              onClick={handleLoginClick}
            >
              Log In
            </Button>
          )}
        </div>
      )}
      {showMobileSearch && (
        <div className="absolute top-19.5 right-4 left-4 z-50 custom-inputbg">
          <SearchBar isMobile onClose={() => setShowMobileSearch(false)} />
        </div>
      )}
      <nav className="w-full topMenu">
        <div className="flex items-center justify-end xl:justify-between relative px-4 md:px-12">
          <div className="hidden xl:flex flex-1 justify-start">
            <RenderNavigation items={navbarTree} />
          </div>
        </div>
      </nav>
    </>
  );
};