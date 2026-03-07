import React, { useState, type JSX } from 'react'
import CalculatorFooter from '../CalculatorFooter';

interface DeficitForm
{
    weight: number;
    dehydration: number;
}

const DeficitCalculator: React.FC = (): JSX.Element =>
{
    const [result, setResult] = useState<number>(0);

    const [formData, setFormData] = useState<DeficitForm>(
    {
        weight: 0,
        dehydration: 0
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void =>
    {
        const { name, value } = e.target;
        
        setFormData((prev) => ({...prev, [name]: value, }));
    };

    const handleReset = (): void =>
    {
        setResult(0);

        setFormData((prev) => ({ ...prev, weight: 0, dehydration: 0 }));
    }

    const handleSubmit = (): void =>
    {
        setResult((formData.weight * formData.dehydration) * 10);
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

            <form className="flex flex-col flex-1 p-2.5">

                <div className="flex h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">Peso</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input
                            name="weight"
                            type="number"
                            className="w-32"
                            min="0"
                            value={formData.weight}
                            onChange={handleChange}
                        />

                        <span className="font-light italic">kgs</span>

                    </div>

                </div>

                <div className="h-2.5"/>

                <div className="flex h-12.5 border dark:text-white dark:border-black rounded-md dark:bg-[#303030]">

                    <span className="m-3.25 text-[16px]">% Deshidratación</span>

                    <div className="grow" />

                    <div className="bg-[#101010] m-2 p-1.25 rounded-md">

                        <input
                            name="dehydration"
                            type="number" 
                            className="w-32"
                            min="0"
                            value={formData.dehydration}
                            onChange={handleChange}
                        />

                        <span className="font-light italic">%</span>

                    </div>

                </div>

                <div className="h-2.5"/>

                <p className="dark:text-white text-[12px] mx-2 font-light italic">
                    Basado en guías de DiBartola, S. P. (Ed.). Fluid, electrolyte, and acid-base disorders in small animal practice.

                    <br />
                    <br />

                    <span className="font-bold">AVISO:</span> Las recomendaciones de fluidos son una herramienta de apoyo basada en algoritmos estándar. La elección final del fluido y el volumen es responsabilidad exclusiva del criterio clínico del médico veterinario tratante.
                </p>

                <div className="flex-1" />

            </form>

            <CalculatorFooter onReset={handleReset} onSubmit={handleSubmit}/>

        </>
    )
}

export default DeficitCalculator