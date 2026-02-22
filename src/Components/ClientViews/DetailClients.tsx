import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import Placeholder24x24 from '../../assets/Placeholder24x24';
import axios from 'axios';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';

interface DetailClientsProps
{
    id: string;
}

interface ClientResponse
{
    id: string,
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: number;
    address: string;
    birthDate: string;
    registrationDate: string;
    emergencyContactName: string;
    emergencyContactPhone: number;
}

const DetailClients: React.FC<DetailClientsProps> = ({id}: DetailClientsProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleBack = () =>
    {
        navigate("../lista")
    }

    const [getClient, setClient] = useState<ClientResponse>();

    useEffect(() =>
    {
        axios.get<ClientResponse>(`http://localhost:5126/api/client/${id}`).then((res) =>
        {
            setClient(res.data);
        })
        .catch((e) => console.error("Error de consulta de api en Clients:", e));
    }, []);

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

                <button
                    className="m-3.5 h-8 w-8 flex items-center justify-center rounded-md bg-green-400 hover:bg-green-500 active:bg-green-600"
                >
                    <Placeholder24x24/>
                </button>

            </header>

            <div className="bg-black h-px"/>

            <div className="flex flex-col justify-center dark:bg-[#202020] border dark:border-black m-2.5 p-2.25 dark:text-white text-[12px] rounded">
                <div className="flex items-center">
                    <PlaceholderCircle64x64/>
                    <div className="flex flex-col m-2.5 text-[16px]">
                        <span><strong>{getClient?.firstName}</strong></span>
                        <span>{getClient?.lastName}</span>
                    </div>
                </div>

                <div className="text-[14px]">
                    <span className="flex items-center mt-2.5">
                        <Placeholder20x20/>
                        <label className="ml-2.5">{getClient?.email}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <Placeholder20x20/>
                        <label className="ml-2.5">{getClient?.phoneNumber}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <Placeholder20x20/>
                        <label className="ml-2.5">{getClient?.address}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <Placeholder20x20/>
                        <label className="ml-2.5">{getClient?.birthDate}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <Placeholder20x20/>
                        <label className="ml-2.5">{getClient?.registrationDate}</label>
                    </span>
                </div>
                
            </div>

            <div className="flex flex-col justify-center dark:bg-[#202020] border dark:border-black mx-2.5 p-2.5 dark:text-white text-[12px] rounded">
                <label className="font-light text-[12px]">Contacto de emergencia</label>
                <span className="flex items-center mt-1">
                    <Placeholder20x20/>
                    <label className="ml-2.5">{getClient?.emergencyContactName}</label>
                </span>
                <span className="flex items-center mt-2.5">
                    <Placeholder20x20/>
                    <label className="ml-2.5">{getClient?.emergencyContactPhone}</label>
                </span>
            </div>
        </>
    )
}

export default DetailClients