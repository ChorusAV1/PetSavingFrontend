import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from './ViewHeader';

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
                    <li key={client.id}>
                        {/* Render client details */}
                        {client.firstName}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Clients