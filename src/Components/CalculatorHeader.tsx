import React, { type JSX } from 'react'
import Placeholder24x24 from '../assets/Placeholder24x24'
import { useNavigate } from 'react-router-dom';

interface CalculatorHeaderProps 
{
    label: string;
}

const CalculatorHeader: React.FC<CalculatorHeaderProps> = ({label}: CalculatorHeaderProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>
    {
        const selectedPage = event.target.value;

        navigate(selectedPage)
    }

    return (
        <header className="flex items-center h-15
                           dark:bg-[#202020] dark:text-white">

            <div className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-[#AFAFAF]">
                <Placeholder24x24/>
            </div>

            <span className="text-[12px] select-none"><strong>{label}</strong></span>

            <div className="grow"/>

            <select onChange={handleChange} className="dark:bg-[#303030] border dark:border-black mr-3.5 h-8 rounded-md">
                <option value="deficit" selected>Déficit</option>
                <option value="mantenimiento">Mantenimiento</option>
                <option value="goteo">Cálculo de goteo</option>
            </select>

        </header>
    )
}

export default CalculatorHeader