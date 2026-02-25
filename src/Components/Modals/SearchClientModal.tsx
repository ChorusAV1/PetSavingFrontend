import axios from 'axios';
import React, { useEffect, useState, type JSX } from 'react'
import PlaceholderCircle32x32 from '../../assets/PlaceholderCircle32x32';
import Placeholder20x20 from '../../assets/Placeholder20x20';

interface SearchClientModalProps
{
    onClose: () => void;
    selectClient: (fullName: string, id: string) => void;
}

interface GETClientRequestDTO
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

const SearchClientModal: React.FC<SearchClientModalProps> = ({ onClose, selectClient}: SearchClientModalProps): JSX.Element =>
{
    const sendInfo = (fullName: string, id: string) =>
    {
        selectClient(fullName, id)

        onClose();
    }

    const [clients, setClients] = useState<GETClientRequestDTO[]>([]);

    const [loading, setLoading] = useState(false);

    const getClients = async () =>
    {
        try
        {
            setLoading(true);

            const res = await axios.get<GETClientRequestDTO[]>("http://localhost:5126/api/client");

            setClients(res.data);
        }
        catch(e)
        {
            console.error("Error al cargar los clientes de SearchClientModal: ", e);

            return[];
        }
        finally
        {
            setLoading(false);
        }
    }

    useEffect(() =>
    {
        getClients();
    },[])

    if (loading)
    {
        return (
            <p>Cargando...</p>
        );
    }

    return (
        <>
            <header className="flex items-center py-2 px-3 dark:text-white border-b dark:border-black">
                <label className="">Seleccionar cliente</label>

                <div className="grow"/>

                <button onClick={onClose}>
                    <Placeholder20x20/>
                </button>
                
            </header>
            <div className="flex flex-col items-center justify-center py-2.5 pt-20 overflow-y-auto overflow-x-hidden h-100">

            <ul className="space-y-2.5">

                {clients.map((client) => (

                <div className={`flex flex-col justify-center dark:bg-[#202020] border dark:border-black hover:dark:bg-[#303030] active:dark:bg-[#101010] mx-2.5 p-2.5 dark:text-white rounded`}
                     onClick={() => sendInfo(client.firstName + " " + client.lastName, client.id)}>

                    <div className="flex items-center w-70">
                        <PlaceholderCircle32x32/>

                        <li key={client.id}
                            className="ml-2.5">
                            <h2>{client.firstName} {client.lastName}</h2>
                            <p className="font-light">{client.email}</p>
                        </li>
                    </div>
                    
                </div>

                ))}
            </ul>
            
            </div>
        </>
        
    )
}

export default SearchClientModal