import React, { useEffect, type JSX } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Pet: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    useEffect(() =>
    {
        navigate("list")
    }, []);
    
    return (
        <div className="flex flex-col grow">

            <Outlet/>

        </div>
    )
}

export default Pet