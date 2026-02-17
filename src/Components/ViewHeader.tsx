import React, { type JSX } from 'react'
import Placeholder24x24 from '../assets/Placeholder24x24';
import Placeholder20x20 from '../assets/Placeholder20x20';

interface ViewHeaderProps 
{
    label: string;
}

const ViewHeader: React.FC<ViewHeaderProps> = ({ label }: ViewHeaderProps): JSX.Element => {
  return (
    <>
        <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

            <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
               <Placeholder24x24/>
            </div>

            <span className="text-[12px] select-none"><strong>{label}</strong></span>

            <div className="grow"/>

            <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]">

                <div className="m-1.25">
                   <Placeholder20x20/>
                </div>

                <span className="text-[10px]">Ordenar</span>

            </button>

            <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]">

                <div className="m-1.25">
                   <Placeholder20x20/>
                </div>

                <span className="text-[10px]">Nuevo</span>

            </button>

        </header>

        <div className="bg-black h-px"/>
    </>
  )
}

export default ViewHeader