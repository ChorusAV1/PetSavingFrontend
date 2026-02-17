import type { JSX } from "react"
import Placeholder20x20 from "../assets/Placeholder20x20"
import { Link } from "react-router-dom";

interface NavbarButtonProps
{
    label: string;
    path: string;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({label, path}: NavbarButtonProps):JSX.Element =>
{
    return (
        <Link to={path} className="flex justify-center">
            <button className="h-14 flex flex-col items-center justify-center 
                            dark:hover:bg-[#242424] dark:active:bg-[#303030]">
                <Placeholder20x20/>
                <span className="dark:text-white text-[10px] mt-1.25">
                    {label}
                </span>
            </button>
        </Link>
    )
}

export default NavbarButton