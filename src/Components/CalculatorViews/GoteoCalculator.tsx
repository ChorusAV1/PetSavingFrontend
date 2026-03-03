import React, { useState, type JSX } from 'react'
import CalculatorFooter from '../CalculatorFooter';

interface DropForm
{
    weight: number;
    dehydration: number;
    loses: number;
    equipment: string;
}

const GoteoCalculator: React.FC = (): JSX.Element =>
{
    const [result, setResult] = useState<number>(0);

    const [formData, setFormData] = useState<DropForm>(
    {
        weight: 0,
        dehydration: 0,
        loses: 0,
        equipment: "Normogotero"
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void =>
    {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]:
            name === "equipment"
                ? value
                : (e.target as HTMLInputElement).valueAsNumber,
        }));
    };

    const handleReset = (): void =>
    {
        setResult(0);

        setFormData((prev) => ({ ...prev, weight: 0, dehydration: 0, loses: 0 }));
    }

    const handleSubmit = (): void =>
    {
        if (formData.equipment == "Normogotero")
        {
            setResult(formData.weight + (formData.dehydration + formData.loses) * 2);
        }
        
        if (formData.equipment == "Microgotero")
        {
            setResult(formData.weight + (formData.dehydration - formData.loses) * 3)
        }
    }
    return (
        <>
            <section className="flex flex-col dark:bg-black h-25 sticky top-27">

                <span className="text-[16px] dark:text-[#808080] font-light ml-1.25 mt-1.25">Volumen(ml)</span>

                <div className="flex items-baseline mr-5.25">

                    <div className="grow" />

                    <span className="text-[40px] dark:text-white">{result}</span>

                    <span className="text-[24px] font-light dark:text-white">ml</span>

                </div>

            </section>

            <form className="flex flex-col flex-1">

                <div className="flex mx-2.5 mt-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Peso</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input
                            name="weight" 
                            type="number" 
                            className="w-32"
                            min="0"
                            onChange={handleChange}
                            value={formData.weight}
                        />

                        <span className="font-light italic">kgs</span>

                    </div>

                </div>

                <div className="flex mx-2.5 mt-2.5 h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">% Deshidratación</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input
                            name="dehydration"
                            type="number"
                            className="w-32"
                            min="0"
                            onChange={handleChange}
                            value={formData.dehydration}
                        />

                        <span className="font-light italic">???</span>

                    </div>

                </div>

                <div className="flex mx-2.5 mt-2.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Pérdidas</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input
                            name="loses" 
                            type="number" 
                            className="w-32"
                            min="0"
                            onChange={handleChange}
                            value={formData.loses}
                        />

                        <span className="font-light italic">ml</span>

                    </div>

                </div>

                <div className="flex m-2.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[14px]">Factor goteo del equipo</span>

                    <div className="grow" />

                    <select
                        name="equipment"
                        value={formData.equipment}
                        onChange={handleChange}
                        className="bg-[#101010] m-2 p-1.25 rounded-md"
                    >

                        <option value="Normogotero">Normogotero</option>

                        <option value="Microgotero">Microgotero</option>

                    </select>

                </div>

                <p className="dark:text-white text-[12px] mx-6 font-light italic">
                    Basado en guías de DiBartola, S. P. (Ed.). Fluid, electrolyte, and acid-base disorders in small animal practice.

                    <br />
                    <br />

                    <span className="font-bold">AVISO:</span> Las recomendaciones de fluidos son una herramienta de apoyo basada en algoritmos estándar. La elección final del fluido y el volumen es responsabilidad exclusiva del criterio clínico del médico veterinario tratante.
                </p>

            </form>

            <CalculatorFooter onReset={handleReset} onSubmit={handleSubmit}/>
        </>
    )
}

export default GoteoCalculator