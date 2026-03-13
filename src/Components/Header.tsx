import type { JSX } from 'react'
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import MenuSVG from '../assets/MenuSVG';
import LogoutSVG from '../assets/LogoutSVG';

interface HeaderProps
{
    handleSandwichOnClick: () => void;
}

const Header: React.FC<HeaderProps> = ({handleSandwichOnClick}: HeaderProps): JSX.Element =>
{
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    //removes token and redirects to logout
    const handleLogout = () => {
        if(auth){
            auth.logout();
            navigate("/login");
        }
    }

    return (
        <header className="flex h-12 sticky top-0 bg-[#F5F6F7] border-b border-[#DADBDC]
                        dark:bg-black dark:border-[#242424]">
            {/*Navbar toggle*/}
            <button onClick={handleSandwichOnClick} className="flex items-center justify-center w-17 hover:bg-[#fcfcfc] active:bg-white dark:hover:bg-[#242424] dark:active:bg-[#303030] dark:text-white">
                    <MenuSVG/>
            </button>
            

            <div className='grow'/>

            {/*Logout button*/}
            <button 
                onClick={handleLogout}
                className='flex items-center justify-center w-17 dark:hover:bg-[#242424] hover:bg-[#fcfcfc] active:bg-white dark:active:bg-[#303030] dark:text-white'>
                <LogoutSVG/>
            </button>
        </header>
    )
}

export default Header