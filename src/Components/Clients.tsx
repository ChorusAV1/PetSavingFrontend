import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from './ViewHeader';
import PlaceholderCircle32x32 from '../assets/PlaceholderCircle32x32';

interface ClientResponse
{
    id: 1,
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

const Clients: React.FC = (): JSX.Element =>
{
    const [clients, setClients] = useState<ClientResponse[]>([]);

    useEffect(() =>
    {
        axios.get<ClientResponse[]>("http://localhost:5126/api/client").then((res) =>
        {
            setClients(res.data);
        })
        .catch((e) => console.error("Error de consulta de api en Clients:", e));
    }, []);

    return (
        <div>
            <ViewHeader label="Clients" />
            <ul className="dark:text-white">
                {clients.map((client) =>
                (
                    <li key={client.id}
                        className="flex m-2.5 border dark:border-black rounded dark:bg-[#202020]">

                        {/* Render appointment details */}
                        <div className="m-2">
                            <PlaceholderCircle32x32/>
                        </div>

                        <div className="flex flex-col text-[12px] justify-center ml-0.5">
                            <span><strong>{client.firstName + " " + client.lastName}</strong></span>
                            
                            <span>{client.email}</span>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Clients