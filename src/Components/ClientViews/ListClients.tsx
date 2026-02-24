import React, { useEffect, useState, type JSX } from 'react'
import ViewHeader from '../ViewHeader';
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ApptsSVG from '../../assets/ApptsSVG';

interface ListClientsProps
{
    handleClientClick: (id: string) => void;
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

const ListClients: React.FC<ListClientsProps> = ({handleClientClick}: ListClientsProps): JSX.Element =>
{
    const navigate = useNavigate();

    const handleClick = (id: string) =>
    {
        handleClientClick(id)

        navigate("../detallecliente")
    }

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
            <ViewHeader
                label="Clientes"
                icon={<ApptsSVG/>}
                createNavigate="nuevocliente"
            />

            <ul className="dark:text-white">
                {clients.map((client) =>
                (
                    <li
                        key={client.id}
                        className="flex m-2.5 border border-[#DADCDB] shadow dark:shadow-none dark:border-black rounded dark:bg-[#202020] hover:dark:bg-[#303030] active:dark:bg-[#101010]"
                        onClick={() => handleClick(client.id)}>

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

export default ListClients