import React, { type JSX } from 'react'

const GoteoCalculator: React.FC = (): JSX.Element =>
{
    return (
        <>
            <section className="flex flex-col dark:bg-black h-25">

                <span className="text-[16px] dark:text-[#808080] font-light ml-1.25 mt-1.25">Volumen(ml)</span>

                <div className="flex items-baseline mr-5.25">

                    <div className="grow" />

                    <span className="text-[40px] dark:text-white">0</span>

                    <span className="text-[24px] font-light dark:text-white">ml</span>

                </div>

            </section>

            <form className="flex flex-col flex-1 overflow-y-visible">

                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Peso</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input placeholder="0" type="number" className="w-32" />

                        <span className="font-light italic">kgs</span>

                    </div>

                </div>

                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">% Deshidratación</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input placeholder="000" type="number" className="w-32" />

                        <span className="font-light italic">???</span>

                    </div>

                </div>

                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Pérdidas</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input placeholder="000" type="number" className="w-32" />

                        <span className="font-light italic">ml</span>

                    </div>

                </div>

                <div className="flex m-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Factor goteo del equipo</span>

                    <div className="grow" />

                    <select className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <option value="deficit" selected>Microgotero</option>

                        <option value="mantenimiento">Mantenimiento</option>

                    </select>

                </div>

                <p className="dark:text-white text-[12px] mx-6 font-light italic">
                    Basado en guías de DiBartola, S. P. (Ed.). Fluid, electrolyte, and acid-base disorders in small animal practice.

                    <br />
                    <br />

                    <span className="font-bold">AVISO:</span> Las recomendaciones de fluidos son una herramienta de apoyo basada en algoritmos estándar. La elección final del fluido y el volumen es responsabilidad exclusiva del criterio clínico del médico veterinario tratante.
                </p>

                <div className="flex-1" />

                <section className="flex items-center justify-around bg-[#202020] h-18 border-t">

                    <button className="dark:bg-[#3B3B3B] dark:hover:bg-[#303030] dark:active:bg-[#404040] text-[24px] text-white w-18.75 h-12.5 rounded-lg">
                        C
                    </button>

                    <button className="bg-[#339FFF] hover:bg-blue-500 active:bg-blue-400 text-[32px] text-white w-18.75 h-12.5 rounded-lg">
                        =
                    </button>

                </section>

            </form>
        </>
    )
}

export default GoteoCalculator