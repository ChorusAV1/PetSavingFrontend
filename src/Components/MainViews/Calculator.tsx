import React, { useEffect, type JSX } from 'react'
import CalculatorHeader from '../CalculatorHeader';
import { Outlet, useNavigate } from 'react-router-dom';

const Calculator: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    useEffect(() =>
    {
        navigate("deficit")
    }, []);

    return (
        <div className="flex flex-col grow">

            <CalculatorHeader label="Calculadora"/>

            <Outlet/>

        </div>
    )
}

export default Calculator