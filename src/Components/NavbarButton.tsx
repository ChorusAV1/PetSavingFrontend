import type { JSX } from "react"
import Placeholder20x20 from "../assets/Placeholder20x20"

interface NavbarButtonProps
{
    label: string;
    handleNavBarButtonOnClick: (view: string) => void;
}

const NavbarButton: React.FC<NavbarButtonProps> = ({label, handleNavBarButtonOnClick}: NavbarButtonProps):JSX.Element =>
{
    return (
        <button onClick={() => handleNavBarButtonOnClick(label)} className="h-14 flex flex-col items-center justify-center 
                            dark:hover:bg-[#242424] dark:active:bg-[#303030]">
            <Placeholder20x20/>
            <span className="dark:text-white text-[10px] mt-1.25">
                {label}
            </span>
        </button>
    )
}

export default NavbarButton