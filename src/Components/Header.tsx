import type { JSX } from 'react'
import MenuSVG from '../assets/MenuSVG';
import Placeholder24x24 from '../assets/Placeholder24x24';

interface HeaderProps
{
    handleSandwichOnClick: () => void;
}

const Header: React.FC<HeaderProps> = ({handleSandwichOnClick}: HeaderProps): JSX.Element =>
{
    return (
        <header className="flex h-12 sticky top-0 bg-[#F5F6F7] border-b border-[#DADBDC]
                        dark:bg-black dark:border-[#242424]">
            {/*Navbar toggle*/}
            <button onClick={handleSandwichOnClick} className="flex items-center justify-center w-17 dark:hover:bg-[#242424] dark:active:bg-[#303030] dark:text-white">
                    <MenuSVG/>
            </button>
            

            <div className='grow'/>

            {/*Logout button*/}
            <button className='flex items-center justify-center w-17 dark:hover:bg-[#242424] dark:active:bg-[#303030]dark:text-white'>
                <Placeholder24x24/>
            </button>
        </header>
    )
}

export default Header