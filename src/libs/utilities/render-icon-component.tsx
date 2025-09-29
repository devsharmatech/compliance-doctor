import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as AiIcons from "react-icons/ai";
const iconLibraries = {
  fa: FaIcons,
  md: MdIcons,
  ai: AiIcons,
};

export const RenderIconComponent = ({ iconName, iconLibrary }: { iconName: string; iconLibrary: string }) => {
    
  const IconComponent = iconLibraries[iconLibrary]?.[iconName];
  if (!IconComponent) return null;

  return <IconComponent size={24} />;
};
