import React, { useEffect, useState, type JSX } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import PlaceholderCircle64x64 from '../../assets/PlaceholderCircle64x64';
import GenericModal from '../GenericModal';
import DeleteModal from '../Modals/DeleteModal';
import ViewHeader from '../ViewHeader';
import ApptsSVG from '../../assets/ApptsSVG';
import MailSVG from '../../assets/MailSVG';
import PhoneSVG from '../../assets/PhoneSVG';
import AddressSVG from '../../assets/AddressSVG';
import CalendarSVG from '../../assets/CalendarSVG';
import ProfileSVG from '../../assets/ProfileSVG';

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
            <ViewHeader
                label="Cliente"
                icon={<ApptsSVG/>}
                onBackClick={handleBack}
                onEditClick={handleEdit}
                onDeleteClick={() => setOpen(true)}
            />

            <div className="flex flex-col justify-center dark:bg-[#202020] border border-[#DADCDB] dark:border-black m-2.5 p-2.25 dark:text-white text-[12px] rounded shadow dark:shadow-none">
                <div className="flex items-center">
                    <PlaceholderCircle64x64/>
                    <div className="flex flex-col m-2.5 text-[16px]">
                        <span><strong>{getClient?.firstName}</strong></span>
                        <span>{getClient?.lastName}</span>
                    </div>
                </div>

                <div className="text-[14px]">
                    <span className="flex items-center mt-2.5">
                        <MailSVG/>
                        <label className="ml-2.5">{getClient?.email}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <PhoneSVG/>
                        <label className="ml-2.5">{getClient?.phoneNumber}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <AddressSVG/>
                        <label className="ml-2.5">{getClient?.address}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <CalendarSVG/>
                        <label className="ml-2.5">{getClient?.birthDate}</label>
                    </span>
                    <span className="flex items-center mt-2.5">
                        <CalendarSVG/>
                        <label className="ml-2.5">{getClient?.registrationDate}</label>
                    </span>
                </div>
                
            </div>

            <div className="flex flex-col justify-center dark:bg-[#202020] border border-[#DADCDB] dark:border-black mx-2.5 p-2.5 dark:text-white text-[12px] rounded shadow dark:shadow-none">
                <label className="font-light text-[12px]">Contacto de emergencia</label>
                <span className="flex items-center mt-1">
                    <ProfileSVG/>
                    <label className="ml-2.5">{getClient?.emergencyContactName}</label>
                </span>
                <span className="flex items-center mt-2.5">
                    <PhoneSVG/>
                    <label className="ml-2.5">{getClient?.emergencyContactPhone}</label>
                </span>
            </div>

            <GenericModal open={open} onClose={() => setOpen(false)}>

                <DeleteModal message="¿Estás seguro de que deseas eliminar este cliente?" onClickDelete={handleDelete} onClickClose={() => setOpen(false)}/>

            </GenericModal>
        </>
    )
}

export default DetailClients