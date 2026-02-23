import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import Placeholder20x20 from '../../assets/Placeholder20x20';
import Placeholder24x24 from '../../assets/Placeholder24x24';
import axios from 'axios';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import GenericModal from '../GenericModal';
import DeleteModal from '../DeleteModal';

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

    const handleEdit = () =>
    {
        navigate("../editarcliente")
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

    const handleDelete = () =>
    {
        try
        {
            axios.delete(`http://localhost:5126/api/client/${id}`);

            handleBack();
        }
        catch (e)
        {
            console.error("Ocurrió un error al tratar de borrar el cliente: ", e)
        }
        
    }

    const [open, setOpen] = useState<boolean>(false);

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

                <span className="text-[12px] select-none"><strong>Clientes</strong></span>

                <div className="grow"/>

                <button 
                    onClick={handleEdit}
                    className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]">

                    <div className="m-1.25">
                        <Placeholder20x20/>
                    </div>

                    <span className="text-[10px]">Editar</span>

                </button>

                <button className="flex flex-col items-center p-0.75 mx-1.25 rounded-sm select-none
                                dark:hover:bg-[#303030] dark:active:bg-[#101010]"
                        onClick={() => setOpen(true)}>

                    <div className="m-1.25">
                        <Placeholder20x20/>
                    </div>

                <span className="text-[10px]">Eliminar</span>

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

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>
        </>
    )
}

export default DetailClients