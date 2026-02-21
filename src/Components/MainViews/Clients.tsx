import React, { useEffect, type JSX } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const Clients: React.FC = (): JSX.Element =>
{
    const navigate = useNavigate();

    useEffect(() =>
    {
        navigate("lista")
    }, []);

    return (
        <div className="flex flex-col grow">

            <Outlet/>

        </div>
    )
}

export default Clients