import React, { type JSX } from 'react'

interface NavbarProps
{
    children: React.ReactNode;
    isOpen: boolean;
}

const Navbar: React.FC<NavbarProps> = ({children, isOpen}: NavbarProps): JSX.Element =>
{
    const sidebarClasses = `fixed top-12 left-0 dark:bg-black flex flex-col border-r border-[#242424] w-17 grow bg-gray-800 text-white transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 z-40`

    return (
        <nav className={sidebarClasses}>
            {React.Children.map(children, (child) =>
            {
                if (React.isValidElement<NavbarProps>(child))
                {
                    return child;
                }

                return null;
            })}
            <div className = "h-screen"/>
        </nav>
    )
}

export default Navbar