import type { JSX } from 'react'
import Placeholder20x20 from '../assets/Placeholder20x20'

interface HeaderProps
{
    handleSandwichOnClick: () => void;
}

const Header: React.FC<HeaderProps> = ({handleSandwichOnClick}: HeaderProps): JSX.Element =>
{
    return (
        <header className="flex h-12 sticky top-0
                        dark:bg-black dark:border-b dark:border-[#242424]">
            <div className="w-17 flex items-center justify-center dark:text-white">
                <button onClick={handleSandwichOnClick} className="flex items-center justify-center">
                    <Placeholder20x20 />
                </button>
            </div>
        </header>
    )
}

export default Header