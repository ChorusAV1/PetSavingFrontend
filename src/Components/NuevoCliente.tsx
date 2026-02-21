import React, { type JSX } from 'react'
import Placeholder20x20 from '../assets/Placeholder20x20'
import Placeholder24x24 from '../assets/Placeholder24x24'
import { useNavigate } from 'react-router-dom';
import PlaceholderCircle64x64 from '../assets/PlaceholderCircle64x64';

const NuevoCliente: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../lista")
    }

    return (
        <>
            <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

                <button className="pl-3.5" onClick={handleBack}>
                    <Placeholder20x20/>
                </button>

                <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
                    <Placeholder24x24/>
                </div>

                <span className="text-[12px] select-none"><strong>Nuevo Cliente</strong></span>

                 <div className="grow"/>

                <button className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600">
                    <Placeholder24x24/>
                </button>

            </header>

            <div className="bg-black h-px"/>

            <form className="flex flex-col justify-center dark:bg-[#202020] border dark:border-black m-2.5 p-2.5 dark:text-white text-[12px]">

                <div className="flex items-center mb-10.5">
                    <PlaceholderCircle64x64/>
                    <button className="bg-blue-500 p-1 rounded-md ml-6">
                        <Placeholder24x24/>
                    </button>
                </div>

                
                    <div className="flex">
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Nombre/s</label>
                            <input className="dark:bg-[#101010] h-8 p-2 rounded-md" type='text'/>
                        </div>
                        <div className="w-2.5"/>
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Apellido/s</label>
                            <input className="dark:bg-[#101010] h-8 p-2 rounded-md" type='text'/>
                        </div>
                    </div>
                    
                    <div className="flex">
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Numero de telefono</label>
                            <input className="dark:bg-[#101010] h-8 p-2 rounded-md" type="tel"/>
                        </div>
                        <div className="w-2.5"/>
                        <div className="flex flex-col grow">
                            <label className="font-light mt-1.5 mb-1">Fecha de nacimiento</label>
                            <input className="dark:bg-[#101010] h-8 p-2 rounded-md" type='date'/>
                        </div>
                    </div>
                

                <div>
                    <div className="flex flex-col">
                        <label className="font-light mt-1.5 mb-1">Email</label>
                        <input className="dark:bg-[#101010] h-8 p-2 rounded-md" type="email"/>
                    </div>
                    
                    <div className="flex flex-col">
                        <label className="font-light mt-1.5 mb-1">Dirección</label>
                        <input className="dark:bg-[#101010] h-16 p-2 rounded-md" type="text"/>
                    </div>
                </div>

            </form>
        </>
    )
}

export default NuevoCliente