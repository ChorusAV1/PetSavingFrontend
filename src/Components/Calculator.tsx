import React, { type JSX } from 'react'
import Placeholder24x24 from '../assets/Placeholder24x24'

interface CalculatorProps
{
    label: string;
}

const Calculator: React.FC<CalculatorProps> = ({label}: CalculatorProps): JSX.Element =>
{
    return (
        <div className="flex flex-col min-h-screen">

            <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

                <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
                    <Placeholder24x24/>
                </div>

                <span className="text-[12px] select-none"><strong>{label}</strong></span>

                <div className="grow"/>

                <select name="fruits" id="fruits" className="dark:bg-[#303030] border dark:border-black mr-3.5 h-8 rounded-md">
                    <option value="apple" selected>Déficit</option>
                    <option value="banana">Mantenimiento</option>
                    <option value="orange">Cálculo de goteo</option>
                </select>

            </header>

            <section className="flex flex-col dark:bg-black h-25">

                <span className="text-[16px] dark:text-[#808080] font-light ml-1.25 mt-1.25">Volumen(ml)</span>

                <div className="flex items-baseline mr-5.25">

                    <div className="grow"/>

                    <span className="text-[40px] dark:text-white">0</span>

                    <span className="text-[24px] font-light dark:text-white">ml</span>

                </div>
                
            </section>

            <form className="flex flex-col flex-1">
                
                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded dark:bg-[#202020]">

                    <span className="m-3.25 text-[16px]">Peso</span>
                    
                    <div className="grow"/>

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input placeholder="0" type="number" className="w-32"/>

                        <span className="font-light italic">kgs</span>

                    </div>
                        
                </div>

                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded dark:bg-[#202020]">

                    <span className="m-3.25 text-[16px]">% Deshidratación</span>
                    
                    <div className="grow"/>

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input placeholder="0" type="number" className="w-32"/>

                        <span className="font-light italic">???</span>

                    </div>
                        
                </div>

                <p className="dark:text-white text-[12px] mx-6 font-light italic">
                    Basado en guías de DiBartola, S. P. (Ed.). Fluid, electrolyte, and acid-base disorders in small animal practice.
                    
                    <br/>
                    <br/>

                    <span className="font-bold">AVISO:</span> Las recomendaciones de fluidos son una herramienta de apoyo basada en algoritmos estándar. La elección final del fluido y el volumen es responsabilidad exclusiva del criterio clínico del médico veterinario tratante.
                </p>

                <div className="flex-1 dark:text-white dark:bg-amber-300">a</div> {/*Aqui es donde tengo el problema*/}

                <section className="flex items-center justify-around bg-[#202020] h-18 border-t">

                    <button className="bg-[#3B3B3B] text-[24px] text-white w-18.75 h-12.5 rounded-lg">
                        C
                    </button>

                    <button className="bg-[#339FFF] text-[32px] text-white w-18.75 h-12.5 rounded-lg">
                        =
                    </button>

                </section>

            </form>

        </div>
    )
}

export default Calculator