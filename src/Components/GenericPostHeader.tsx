import React, { type JSX } from 'react'
import Placeholder20x20 from '../assets/Placeholder20x20'
import Placeholder24x24 from '../assets/Placeholder24x24'

interface GenericPostHeaderProps 
{
    label: string;
    handleBack: () => void;
    handleSubmit: () => void;
}

const GenericPostHeader: React.FC<GenericPostHeaderProps> = ({ label, handleBack, handleSubmit}: GenericPostHeaderProps): JSX.Element =>
{
    return (
        <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

            <button className="pl-3.5" onClick={handleBack}>
                <Placeholder20x20/>
            </button>

            <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
                <Placeholder24x24/>
            </div>

            <span className="text-[12px] select-none"><strong>{label}</strong></span>

            <div className="grow"/>

            <button
                className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600"
                onClick={handleSubmit}
            >
                <Placeholder24x24/>
            </button>

        </header>
    )
}

export default GenericPostHeader