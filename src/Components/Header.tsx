import type { JSX } from 'react'
import Placeholder20x20 from '../assets/Placeholder20x20'
import MenuSVG from '../assets/MenuSVG';

interface HeaderProps
{
    handleSandwichOnClick: () => void;
}

const Header: React.FC<HeaderProps> = ({handleSandwichOnClick}: HeaderProps): JSX.Element =>
{
    return (
        <header className="flex h-12 sticky top-0 bg-[#F5F6F7] border-b border-[#DADBDC]
                        dark:bg-black dark:border-[#242424]">
            <div className="w-17 flex items-center justify-center dark:text-white">
                <button onClick={handleSandwichOnClick} className="flex h-12 items-center justify-center">
                    <MenuSVG/>
                </button>
            </div>
        </header>
    )
}

export default Header