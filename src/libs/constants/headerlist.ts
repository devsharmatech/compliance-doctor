import { NavItem } from "@/types"
import { FaArrowDown, FaRegFileAlt, FaUser,  } from "react-icons/fa";

export const headerItems: NavItem[] = [ 

  { id: 1, label: "Team", href: "/about/team", icon: "<FaUsers />", parentId: null, type: "navbar" },
  { id: 2, label: "Careers", href: "/about/careers", icon: "FaUser", parentId: null, type: "navbar" },
  // { id: 3, label: "Login", href: "/login", icon: "<FaUser />", parentId: null, type: "navbar" },
]